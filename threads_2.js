process.env.UV_THREADPOOL_SIZE = 5;

import { pbkdf2 } from 'crypto';

const start = Date.now();

/*
pbkdf2(password: BinaryLike, salt: BinaryLike, iterations: number, keylen: number, digest: string, 
  callback: (err: Error | null, derivedKey: Buffer) => void): void

range if salt: 1 to 2147483647
*/

pbkdf2('Vs@123456', '@#$#@$##', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('1:', Date.now() - start);
  // console.log('1:', Date.now() - start, " : ", derivedKey.toString('hex'));
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});