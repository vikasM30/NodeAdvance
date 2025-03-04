import express from 'express'
const app = express()
const port = 3000

app.get('/blocking', (req, res) => {
    let counter = 0;
    for (let index = 0; index < 9000000000; index++) {
        counter++;
    }
    res.status(200).send(`counter value: ${counter}`)
})
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
    console.log(`Worker pid: ${process.pid}`)
})