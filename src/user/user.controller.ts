import { hashPassword, verifyPassword } from '../util/hash';
import prismaService from '../util/prismaService';
import { generateTokens } from '../util/token';
import type { NextFunction, Request, Response } from 'express';
import { randomInt } from 'crypto';
import { addRefreshTokenToWhitelist } from './auth.service';
import Redis from '../util/redis';
import { PrismaPromise } from '@prisma/client';

const USERATTEMPTLIMIT = 5;
/**
  *
  * @param req Request
  * @param res Response
  * @returns User
  */
async function login(req: Request, res: Response, next: NextFunction) {
  console.log(req.path);
  console.log(req.params);

  const { email, password } = req.body;
  const _browserInfo =
    `${req.ip} ${req.headers['user-agent']} ${req.headers['accept-language']}`.replace(
      / undefined/g,
      '',
    ); //TODO: save browser info

  const hashedPassword = hashPassword(password);



  try {
    const user = await prismaService.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'user with email not found' });
    }


    const passwordVerified = verifyPassword({
      candidatePassword: req.body.password,
      salt: user.salt,
      hash: user.password,
    });

    if (!passwordVerified) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const { accessToken, refreshToken } = generateTokens(user.id);
    const browserInfo = {
      userId: user.id,
      ip: req.ip,
      userAgent: req.headers['user-agent'] as string
    }

    await addRefreshTokenToWhitelist(refreshToken, user.id, _browserInfo);
    await addBrwoserInfo(browserInfo);
    const { password, role, id, ...data } = user;

    if (req.path.includes('admin/signin')) {
      console.log('hi admin');
      const userFound = await prismaService.user.findUnique({ where: { email: user.email } });
      if (!userFound) {
        return res.json({ message: 'user not founded' });
      }
      if (userFound?.role === 'ADMIN') {
        return res.json(data);
      }
      return res.status(400).json({ message: 'not allowed cicco' })
    }
    // checkUserCount(user.id); //todo
    res.status(202).json({ accessToken, data });
  } catch (erorr) {
    console.log(erorr);
    next(erorr);
  }
}

/**
  *
  * @param req  Request
  * @param res  Response
  * @returns Create New User
  */
async function create(req: Request, res: Response) {
  const { name, email, password, address, phoneNumber } = req.body;

  const hashedPassword = hashPassword(password);

  try {
    const userPresent = await prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userPresent) {
      return res
        .status(409)
        .json({ message: `${userPresent.email} already exists` });
    }
    const user = await prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword.hash,
        salt: hashedPassword.salt,
        address,
        phoneNumber,
      },
    });

    const browserInfo = {
      userId: user.id,
      ip: req.ip,
      userAgent: req.headers['user-agent'] as string
    }
    await addBrwoserInfo(browserInfo);

    const { password, role, id, ...data } = user;
    await Redis.set('user', JSON.stringify(data));
    return res.status(201).json({ message: 'created', data });

  } catch (error) {
    console.log(error);
    return res.status(424).json({
      message: 'Failed to create user',
    });
  }
}

/**
* @param req Request
* @param res Response
* createRandom
* @return RandomUser
*/
async function createRandom(req: Request, res: Response) {
  const g = randomInt(0, 1000000);
  const hashedPassword = hashPassword('password');
  try {
    const user = await prismaService.user.create({
      data: {
        name: `us${g}r ${g + 1}`,
        email: `user${g}f.@gmail.com`,
        password: hashedPassword.hash,
        address: 'somewher 23',
        salt: hashedPassword.salt,
        phoneNumber: `${g}-122`
      },
    });

    if (user) {
      res.status(200).json({ user: user.name });
    }
    if (!user) {
      return res.status(400).json({ msg: 'opps' });
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * used to retrive user from database
 * @param req
 * @param res
 */
async function getUser(req: any, res: Response) {
  const user = await prismaService.user.findUnique({ where: { id: req['user'].userId } });
  if (user) {
    return res.status(202).json({
      userInfo: {
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber
      }
    })
  } else {
    return res.status(404).json({ msg: 'not auth' })
  }
}


/**
 * Record browser info
 */
async function addBrwoserInfo(info: any) {
  const { userId, ip, userAgent } = info;

  const isThereData = await prismaService.userBrowser.findFirst({
    where: {
      userId,
    },
  })
  if (isThereData) {
    return
  } else {
    await prismaService.userBrowser.create({
      data: {
        userId,
        ip,
        userAgent
      },
    })
  }

}

const checkUserCount = async (userId: string) => {
  //@ts-ignore
  return prismaService.$transaction( async (prisma) => {
    // 1. Count current total user posts
    const currentUserAttempt = await prisma.user.count({
      where: {
        id: userId,
      },
    })
    console.log(currentUserAttempt);

    // 2. Check if user can create posts
    if (currentUserAttempt >= USERATTEMPTLIMIT) {
      throw new Error(`User ${userId} has reached maximum posts}`)
    }
  })
}

export {
  login,
  create,
  createRandom,
  getUser,

}
