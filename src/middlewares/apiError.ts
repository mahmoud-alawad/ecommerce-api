import { Request, Response, NextFunction } from 'express'

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
  process.env.SITE_ENV === 'development' ? console.log(err) : false;
  return res.status(500).json({ msg: err.message, name: err.name })
}
