import prismaService from '../util/prismaService';
import { RefreshToken, User } from "@prisma/client";
import { hashToken } from '../util/hash'



/**
 * used when we create a refresh token.
 * @param reToken
 * @param userId
 * @returns
 */
async function addRefreshTokenToWhitelist(reToken: RefreshToken['hashedToken'],
  userId: RefreshToken['userId'], browserInfo: RefreshToken['browserInfo']) {
  if (reToken) {
    return prismaService.refreshToken.create({
      data: {
        hashedToken: hashToken(reToken).toString(),
        userId,
        browserInfo
      },
    });
  }
}


/**
 * used to check if the token sent by the client is in the database.
 * @param id
 * @returns
 */
async function findRefreshTokenById(userId: User['id']) {
  return await prismaService.refreshToken.findFirst({
    where: {
      userId,
    },
  });
}


/**
 * soft delete tokens after usage.
 * @param id
 * @returns
 */
function deleteRefreshToken(id: User['id']) {
  return prismaService.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

/**
 * used to update state token
 * @param userId
 * @returns boolean
 */
function revokeTokens(userId: User['id']) {
  return prismaService.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

export {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
}
