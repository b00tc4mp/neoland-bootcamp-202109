function signUp(args = {}) {
    const { name, username, feedback } = args 

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,  initial-scale=1.0">
        <title>Sign up | Demo Web-App</title>
    
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>Demo Web-App</h1>
        <h1>Sign up</h1>
        <form method="POST" action="/signup">
            <input type="text" name="name" placeholder="name" ${name? `value="${name}"` : ''} required>
            <input type="text" name="username" placeholder="username" ${username? `value="${username}"` : ''} required>
            <input type="password" name="password" placeholder="password" required minlength="8">
            ${feedback? `<p class="feedback feedback--error">${feedback}</p>` : ''}
            <button>Sign up</button>
        </form>
    </body>
    </html>`
}

module.exports = signUp