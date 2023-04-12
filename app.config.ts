// import * as dotenv from 'dotenv';
// dotenv.config();
const config = {
  siteUrl: 'http://localhost',
  sitePort: '3000',
  siteName: 'my site',
  origin: 'http://172.25.0.1',
  smtp: {
    // host: process.env.EMAIL_HOST,
    // pass: process.env.EMAIL_PASS,
    // port: process.env.EMAIL_PORT,
    // user: process.env.EMAIL_USER,
  },
  /*
 accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
  */
};
export default config;
