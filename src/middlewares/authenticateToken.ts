import { User } from '@prisma/client';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import Redis from '../util/redis';

 function  authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  
  try {
    let token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    const decode = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
       (err: any, user: any) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user as User;
        //  await Redis.set('user',req.user);
        next();
      },
    );
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Authorization failed',
    });
  }
}
export { authenticateToken };
