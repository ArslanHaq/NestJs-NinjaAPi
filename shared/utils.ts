const bcrypt = require('bcrypt');
export function hashPassword(
  password: string,
  saltRounds: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err: Error, salt: string) => {
      if (err) {
        reject(err);
        return;
      }

      bcrypt.hash(password, salt, (err: Error, hash: string) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(hash);
      });
    });
  });
}
export function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
