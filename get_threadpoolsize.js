import os from "os";
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
console.log(process.env.UV_THREADPOOL_SIZE)
