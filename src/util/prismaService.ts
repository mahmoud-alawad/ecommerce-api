import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});
prisma.$on('warn', (e) => {
  console.log(e)
})

prisma.$on('info', (e) => {
  console.log(e)
})

prisma.$on('error', (e) => {
  console.log(e)
})

// declare global {
//   var __db: PrismaClient | undefined
// }

// if (process.env.SITE_ENV === 'production') {
//   prisma.$connect();
// } else {
//   if (!global.__db) {
//     global.__db = new PrismaClient()
//     global.__db.$connect()
//   }
//   prisma = global.__db
// }
export default prisma;
