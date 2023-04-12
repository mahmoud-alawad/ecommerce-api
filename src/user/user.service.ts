// import { User } from '@prisma/client';
// import { Request, Response, NextFunction } from 'express';
// import { hashPassword } from '../util/hash';
// import prismaService from '../util/prismaService';
// import { generateTokens } from '../util/token';
// import { addRefreshTokenToWhitelist } from './auth.service';

// async function createUser(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(400);
//       throw new Error('You must provide an email and a password.');
//     }

//     const existingUser = findUserByEmail(email);

//     if (await existingUser) {
//       res.status(400);
//       throw new Error('Email already in use.');
//     }

//     const user = await createUserByEmailAndPassword({ email, password });
//     const { accessToken, refreshToken } = generateTokens(user['id']);
//     //await addRefreshTokenToWhitelist(refreshToken, user.id);

//     res.json({
//       accessToken,
//       refreshToken,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// function findUserByEmail(email: User['email']) {
//   return prismaService.user.findUnique({
//     where: {
//       email,
//     },
//   });
// }

// function createUserByEmailAndPassword(user: any) {
//   user.password = hashPassword(user.password).hash;
//   return prismaService.user.create({
//     data: user,
//   });
// }

// function findUserById(id: string) {
//   return prismaService.user.findUnique({
//     where: {
//       id,
//     },
//   });
// }
// export {
//   createUser,
//   findUserById,
//   findUserByEmail,
//   createUserByEmailAndPassword
// }
