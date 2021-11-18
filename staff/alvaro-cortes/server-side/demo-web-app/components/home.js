function home(args = {}) {
    const { name } = args

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,  initial-scale=1.0">
        <titleHome | Demo Web-App</title>
    
        <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>Demo Web-App</h1>

        <h1>Hello, ${name}!</h1>

        <a href="change-password"><button>Change password</button></a>
        <a href="change-data"><button>Change data</button></a>
        <a href="unregister"><button>Unregister user</button></a>

        <form method="POST" action="/signout">
            <button>Sign out</button>
        </form>
    </body>
    </html>`
}

module.exports = home