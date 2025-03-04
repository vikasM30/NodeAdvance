import express from 'express';
import { Worker } from 'worker_threads';
const app = express()
const port = 3000

app.get('/non-blocking', (req, res) => res.send('Hello World!'))
app.get('/blocking', (req, res) => {
    const worker = new Worker('./worker.js');
    worker.on('message', (data) => {
        console.log(data);
        res.status(200).send(`counter value: ${data}`)
    })
    worker.on('error', (error) => {
        res.status(400).send(`Error: ${error}`)
    })
})
app.get('/blocking-without-worker-thread', (req, res) => {
    let counter = 0;
    for (let index = 0; index < 9000000000; index++) {
        counter++;
    }
    res.status(200).send(`counter value: ${counter}`)
})
app.listen(port, () => console.log(`listening on port ${port}!`))