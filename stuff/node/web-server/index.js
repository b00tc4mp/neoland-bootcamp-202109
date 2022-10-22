const express = require('express')

const server = express()

server.use(express.static('public')) // middleware

server.listen(8000)