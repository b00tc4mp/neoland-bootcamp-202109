function signIn(args = {}) {
    const { username, feedback } = args 

    return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width,  initial-scale=1.0">
                    <title>Sign in | Demo Web-App</title>
                
                    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                    <h1>Demo Web-App</h1>
                    <h1>Sign in</h1>
                    <form class="signin" method="POST" action="/signin">
                        <input type="text" name="username" placeholder="username" ${username ? `value="${username}"` : ''} required>
                        <input type="password" name="password" placeholder="password" required minlength="8">
                        ${feedback ? `<p class="feedback feedback--error">${feedback}</p>` : ''}
                        <button>Sign in</button>
                    </form>
                </body>
                </html>`
}

module.exports = signIn