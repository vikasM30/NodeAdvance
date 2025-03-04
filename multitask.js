process.env.UV_THREADPOOL_SIZE = 12;

import { request } from 'https';
import { pbkdf2 } from 'crypto';
import { readFile } from 'fs';

const start = Date.now();

function doRequest() {
  request('https://www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log("https.request():  ", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
doHash();
doHash();
doHash();
doHash();
doHash();
doHash();
doHash();