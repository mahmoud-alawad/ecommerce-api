import { Response, Request, NextFunction } from 'express';
import Redis from '../util/redis';

async function cacheUser(req: Request, res: Response, next: NextFunction) {
  console.log(req.params);

  const data = await Redis
    .get('user')
    .catch((err) => res.status(500).send(err));
  if (data !== null) {
    console.log("we Found it in Redis 🟢");
    console.log(data);
    res.send(data);
  } else {
    console.log("User Not Found 🔴 ");
    // go To ⏭️ function or middleware
    next();
  }
}

async function cacheProducts(req: Request, res: Response, next: NextFunction) {
  const data = await Redis
    .get('products')
    .catch((err) => res.status(500).send(err));
        
  if (data !== null) {
    console.log("we Found it in Redis 🟢");
    console.log(data);
    res.send(data);
  } else {
    console.log("products Not Found 🔴 ");
    // go To ⏭️ function or middleware
    next();
  }
}

export { cacheUser, cacheProducts };
