import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    res.send(
        `<div style="font-size: 10rem; font-weight: bold; text-align: center;">404</div>
        <div style="text-align:center; font-size: 1.5rem">${req.url} not find</div>
        `
    )
}

