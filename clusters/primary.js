import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;

console.log(`Total no. of cpus: ${cpuCount}`);
console.log(`Primary pid: ${process.pid}`);
console.log(`Master: ${cluster.isPrimary}`)

cluster.setupPrimary({
    exec: __dirname + '/index.js'
})

for (let index = 0; index < cpuCount; index++) {
    cluster.fork();
}
cluster.on('exit', (worker, code, signal) => {
    console.log(`worker pid ${worker.process.pid} has been killed!`);
    console.log("Starting another worker")
    cluster.fork();
})