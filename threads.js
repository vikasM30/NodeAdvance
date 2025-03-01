const http = require('http')
const bcrypt = require('bcrypt')

/**
 * to not increase the threadpool size of the system to more than (Phisical +logical core) as:
 * doing it will inscrease time because of context swithcing by schedulers
 * */

process.env.UV_THREADPOOL_SIZE = 12

http.createServer((request, response) => {
    bcrypt.hash("Vikas Mishra", 2).then((hash) => {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(hash)
        response.end('Hello World');
    })
}).listen(3000);

console.log('to check apachebench for multiple request with concurrency: ab -n 1000 -c 100 "http://127.0.0.1:3000/" | grep "Requests"');