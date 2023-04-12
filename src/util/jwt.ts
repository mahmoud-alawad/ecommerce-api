// import jwt, { JwtPayload } from 'jsonwebtoken'
// import createError from 'http-errors'
// import { User } from '@prisma/client'

// const accessTokenSecret = process.env.JWT_ACCESS_SECRET as string

// export default {
//   signAccessToken(payload: User) {
//     return new Promise((resolve, reject) => {
//       jwt.sign({ payload }, accessTokenSecret, {
//       }, (err, token) => {
//         if (err) {
//           reject(createError.InternalServerError())
//         }
//         resolve(token)
//       })
//     })
//   },
//   verifyAccessToken(token: string) {
//     return new Promise((resolve, reject) => {
//       jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
//         if (err) {
//           const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
//           return reject(createError.Unauthorized(message))
//         }
//         resolve(payload)
//       })
//     })
//   }
// }
