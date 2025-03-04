const express = require('express')
const { Worker } = require('worker_threads');
const app = express()
const port = 3000
const THREAD_COUNT = 11
app.get('/non-blocking', (req, res) => res.send('Hello World!'))

function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./optimised-worker.js', {workerData: { thread_count : THREAD_COUNT}});
        worker.on('message', (data) => {
            resolve(data);
        })
        worker.on('error', (error) => {
            reject(`Error: ${error}`)
        })
    })
}
app.get('/blocking', async (req, res) => {
    const workerPromises = [];
    for (let index = 0; index < THREAD_COUNT; index++) {
        workerPromises.push(createWorker())
    }
    const total_result = await Promise.all(workerPromises);
    let total = 0;
    for (let index = 0; index < total_result.length; index++) {
        total += total_result[index];
        
    }

    res.status(200).send(`counter value ${total}`)
})
app.get('/blocking-without-worker-thread', (req, res) => {
    let counter = 0;
    for (let index = 0; index < 9000000000; index++) {
        counter++;
    }
    res.status(200).send(`counter value: ${counter}`)
})
app.listen(port, () => console.log(`listening on port ${port}!`))