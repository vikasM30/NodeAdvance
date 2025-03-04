import { parentPort } from "worker_threads";

let counter = 0;
for (let index = 0; index < 9000000000; index++) {
    counter++;
}

parentPort.postMessage(counter);