const express = require('express')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, retrieveUser } = require('users')
const {landing,signUp,postSignUp,signIn,home,fail}=require('./components')
const {getUserId}=require('./helpers')
const {searchVehicles}=require('vehicles')
const server = express()

server.use(express.static('public')) // middleware
server.get('/',(req,res)=>{
    const{headers:{cookie}}=req
    const id = getUserId(cookie)

    if(id)
        return retrieveUser(id,(error,user)=>{
            if(error)
                return res.send(fail({message:error.message}))
            const{query:{q}}=req
            if(q)
                return searchVehicles(q,(error,results)=>{
                    if(error)
                        return res.send(fail({message:error.message}))
                    res.send(home({name:user.name,results}))
                })
            res.send(home({name:user.name}))
            })
    res.send(landing())
})

server.get('/signup', (req, res) => { // http://localhost:8000/signup
    const { headers: { cookie } } = req
    const id = getUserId(cookie)
    if (id) return res.redirect('/')
    res.send(signUp())
})
const formBodyParser=bodyParser.urlencoded({extended:false})

server.post('/signup',formBodyParser,(req,res)=>{
    const{headers:{cookie}}= req
    const id= getUserId(cookie)
    if(id)return res.redirect('/')
    const{body:{name,username,password}}=req
    try{
        registerUser(name,username,password,function(error){
            if(error)return res.send(signUp({name,username,feedback:error.message}))
            res.send(postSignUp())
        })
    }catch(error){
        if(error)return res.send(signUp({name,username,feedback:error.message}))
    }
})

server.get('/signin',(req,res)=>{
    const{headers:{cookie}}=req 
    const id=getUserId(cookie)
    if(id)return res.redirect('/')
    res.send(signIn())
})
server.post('/signin',formBodyParser,(req,res)=>{
    const{headers:{cookie}}= req 
    const id=getUserId(cookie)
    if(id)return res.redirect('/')
    const{body:{username,password}}=req
    try{
        authenticateUser(username,password,(error,id)=>{
            if(error)
                return res.send(signIn({username,feedback:error.message}))
            res.setHeader('Set-Cookie',`user-id=${id};Max-Age=3600`)
            res.redirect('/')
        })
    }catch(error){
        return res.send(signIn({username,feedback:error.message}))
    }
})

server.post('/signout',(req,res)=>{
    res.setHeader('Set-Cookie',`user-id=null; Max-Age=0`)
    res.redirect('/')
})

server.all('*',(req,res)=>{
    res.send(fail({message:'sorry,this page isn\'t available'}))
})

server.listen(8000)


//     res.send(`<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width,  initial-scale=1.0">
//         <title>Sign up | Demo Web-App</title>
    
//         <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
//         <link rel="stylesheet" href="style.css">
//     </head>
//     <body>
//         <h1>Demo Web-App</h1>
//         <h1>Sign up</h1>
//         <form method='POST' action='/signup'>
//             <input type='text' name='name' placeholder='name'>
//             <input type='text' name='username' placeholder='username'>
//             <input type='password' name='password' placeholder='password'>
//             <button>Sign up</button>
//         </form>
//     </body>
//     </html>`)

// })
// const formBodyParser = bodyParser.urlencoded({ extended: false })

// server.post('/signup', formBodyParser, (req, res) => {
//     const { body: { name, username, password } } = req

//     registerUser(name, username, password, function (error) {
//         if (error) {
//             res.send(`<!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                 <meta name="viewport" content="width=device-width,  initial-scale=1.0">
//                 <title>Sign up | Demo Web-App</title>
            
//                 <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
//                 <link rel="stylesheet" href="style.css">
//             </head>
//             <body>
//                 <h1>Sorry</h1>
//                 <p>${error.message}</p>
//                 <a href='/signup'>Try again</a>
//             </body>
//             </html>`)
//             return
//         }
//         res.send(`<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width,  initial-scale=1.0">
//             <title>Sign up | Demo Web-App</title>
        
//             <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
//             <link rel="stylesheet" href="style.css">
//         </head>
//         <body>
//             <h1>User successfully registered</h1>
//             <p>You can proceed to <a href='/signin'>Sign In </a>.</p>
//             </body>
//             </html>`)
//     })
// })
// server.get('/signin', (req, res) => {
//     res.send(`<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width,  initial-scale=1.0">
//         <title>Sign in | Demo Web-App</title>
    
//         <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
//         <link rel="stylesheet" href="style.css">
//     </head>
//     <body>
//         <h1>Demo Web-App</h1>
//         <h1>Sign in</h1>
//         <form method='POST' action='/signin'>
//             <input type='text' name='username' placeholder='username'>
//             <input type='password' name='password' placeholder='password'>
//             <button type='submit'>Sign in</button>
//             </form>
//     </body>
//     </html>`)
// })
// server.post('/signin', formBodyParser, (req, res) => {
//     const { body: { username, password } } = req
//     authenticateUser(username, password, (error, id) => {
//         if (error)
//             return res.send(`<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width,  initial-scale=1.0">
//             <title>Sign in | Demo Web-App</title>
        
//             <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
//             <link rel="stylesheet" href="style.css">
//         </head>
//         <body>
//             <h1> Demo Web-App</h1>
//             <h1>Sign in</h1>
//             <form class='signin' methode='POST' action='/signin'>
//                 <input type='text' name='username' placeholder='username'>
//                 <input type='password' name='password' placeholder='password'>
//                 <span class='signin__feedback signin__feedback--error'>${error.message}</span>
//                 <button>Sign in</button>
//             </form>
//             </body>
//             </html>` )
//         res.setHeader('Set-Cookie', `user-id=${id}; Max-Age=3600`)
//         res.redirect('/private')
//     })
//     server.get('/private', (req, res) => {
//         const { headers: { cookie } } = req
//         if (!cookie) return res.redirect('/')
//         const [, id] = cookie.split('=')
//         retrieveUser(id, (error, user) => {
//             if (error)
//                 return res.send(`<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width,  initial-scale=1.0">
//             <title>Private | Demo Web-App</title>
        
//             <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
//             <link rel="stylesheet" href="style.css">
//         </head>
//         <body>
//             <h1>${error.message}</h1>
//         </body>
//         </html>`)
//     res.send(`<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width,  initial-scale=1.0">
//         <title>Private | Demo Web-App</title>
    
//         <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
//         <link rel="stylesheet" href="style.css">
//     </head>
//     <body>
//     <h1>Hello,${user.name}!</h1>
//     </body>
//     </html>`)
//         })
//     })
// })