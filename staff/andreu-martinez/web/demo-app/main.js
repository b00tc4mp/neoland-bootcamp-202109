//data
var users = []



//views

var landingContainer = document.querySelector('.landing')
var signupContainer = document.querySelector('.signup')
var signinContainer = document.querySelector('.signin')
var postSignupContainer = document.querySelector('.post-signup')
var homepage = document.querySelector('.homepage')
var nameSpan = homepage.querySelector('.name')

var landingButtons = landingContainer.querySelectorAll('button')

var signupButton = landingButtons[1]

signupButton.onclick = function() {
    landingContainer.classList.add('container--off')

    signupContainer.classList.remove('container--off')
}

var landingSigninButton = landingButtons[0]

landingSigninButton.onclick = function() {
    landingContainer.classList.add('container--off')

    signinContainer.classList.remove('container--off')
}
var signupButtons = signupContainer.querySelectorAll('button')

var signupSigninButton = signupButtons[0]

signupSigninButton.onclick = function(event) {
    event.preventDefault()

    signupContainer.classList.add('container--off')

    signinContainer.classList.remove('container--off')
}

var signinButtons = signinContainer.querySelectorAll('button')

var signinSignupButton = signinButtons[0]

signinSignupButton.onclick = function(event) {
    event.preventDefault()

    signinContainer.classList.add('container--off')

    signupContainer.classList.remove('container--off')
}

signinContainer.onsubmit =function(event){
    event.preventDefault()
    var inputs = signinContainer.querySelectorAll('input')

    var usernameInput=inputs[0]
    var passwordInput=inputs[1]

    var username= usernameInput.value
    var password =passwordInput.value

    if (!username.length) return alert('username is empty')
    if (!password.length) return alert('password is empty')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401) return alert ('wrong credentials')

        if (status === 200) {
            var response = xhr.responseText

            var token = response.slice(10, -2)

            var xhr2 = new XMLHttpRequest

            xhr2.onload = function() {
                var response = xhr2.responseText

                var name = response.slice(9, response.indexOf(',') -1)

                signinContainer.reset()

                signinContainer.classList.add('container--off')

                nameSpan.innerText = name 
                
                homepage.classList.remove('container--off')
            }
            xhr2.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')
            xhr2.setRequestHeader('Authorization', 'Bearer ' + token)

            xhr2.send()
        }
    }

    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

    var body = '{ "username": "' + username + '", "password": "' + password + '" }'

    xhr.send(body)
}


signupContainer.onsubmit = function(event) {
    event.preventDefault()

    var inputs = signupContainer.querySelectorAll('input')

    var nameInput = inputs[0]
    var usernameInput = inputs[1]
    var passwordInput = inputs[2]
    var emailInput = inputs[3]

    var name = nameInput.value
    var username = usernameInput.value
    var password = passwordInput.value
    var email = emailInput.value

    if (!name.length) return alert('name is empty')
    if (!username.length) return alert('username is empty')
    if (!password.length) return alert('password is empty')
    if (!email.length) return alert('email is empty')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 409) return alert('user already exists')

        if (status === 201) {
            signupContainer.reset()

            signupContainer.classList.add('container--off')

            postSignupContainer.classList.remove('container--off')
        }
    }


   xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users') 

   xhr.setRequestHeader('Content-Type', 'application/json')

   var body = '{ "name": "' + name + '", "username": "' + username + '", "password": "' + password + '" }'

   xhr.send(body)
}

var postSignupSigninButton = postSignupContainer.querySelector('button')

postSignupSigninButton.onclick = function() {
    postSignupContainer.classList.add('container--off')

    signinContainer.classList.remove('container--off')
}
