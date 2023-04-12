import crypto from 'crypto';

const algorithm = 'sha256';

export function hashPassword(password: string): { hash: string, salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, algorithm)
    .toString('hex');
  return { hash, salt };
}

export function verifyPassword({
  candidatePassword,
  salt,
  hash,
}: {
  candidatePassword: string;
  salt: string;
  hash: string;
}) {
  const candidatehash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, algorithm)
    .toString('hex');

  return candidatehash === hash;
}
/**
 *
 * @param token
 * @returns Hashed token to save in database
 */
export function hashToken(token: string) {
  return crypto.createHash(algorithm).update(token).digest('hex');
}
