require('dotenv').config()

const express = require('express')
const app = express()
const http = require("http")
const server = http.createServer(app)

const cors = require("cors")
const bodyParser = require("body-parser")

const { StartMongodb } = require("./DB/MongoDB")
const { setupRouters } = require("./routers")


async function startServer() {
    await StartMongodb()

    app.use(cors())
    app.use(bodyParser.json());
    setupRouters(app)
    app.use(function (error, req, res, next) {
        console.log('----------------------------------------')
        console.log(error)
        res.status(500).send({error: error.message})
    })

    let port = process.env.PORT || 4000
    server.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
}



startServer()