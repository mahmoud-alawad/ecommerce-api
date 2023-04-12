import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(id: User['id']) {
  return jwt.sign({ userId: id }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '1w',
  }) as string;
}


/**
 * I would go for a maximum of 7 days, and make user login again after 7 days of inactivity.
 * @param id
 * @returns string
 */
function generateRefreshToken(id: User['id']) {
  return jwt.sign({
    userId: id,
  }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '7d',
  }) as string;
}

function generateTokens(id:User['id']) {
  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);

  return {
    accessToken,
    refreshToken,
  };
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};
