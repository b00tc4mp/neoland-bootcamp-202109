const express = require('express')

const server = express()

server.use(express.static('public')) // middleware

server.get('/hello', function(req, res) { // http://localhost:8000/hello?name=Pepito => html saluting Pepito
    const name = req.query.name

    const userAgent = req.headers['user-agent']

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,  initial-scale=1.0">
        <title>Hello, ${name}!</title>
    
        <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>Hello, ${name}!</h1>
        <p>You've connected to this server using the client ${userAgent}.
    </body>
    </html>`)
})

server.listen(8000)