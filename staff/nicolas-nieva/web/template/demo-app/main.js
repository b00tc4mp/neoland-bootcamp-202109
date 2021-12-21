var landing = document.querySelector('.landing')
var signIn = document.querySelector('.sign-in')
var signUp = document.querySelector('.sign-up')
var thankYou = document.querySelector('.thank-you')
var home = document.querySelector('.home')
var profile = document.querySelector('.profile')
var unregister = document.querySelector('.unregister')
var spinner = document.querySelector('.spinner')
var vehiclesid = document.querySelector('.home__detail')


if (!sessionStorage.token) {
    spinner.classList.add('container--hide')

    landing.classList.remove('container--hide')
} else {
    try {
        retrieveUser(sessionStorage.token, function (error, user) {
            if (error) return alert(error.message)

            var name = user.name

            var nameSpan = home.querySelector('.name')

            nameSpan.innerText = name

            spinner.classList.add('container--hide')

            home.classList.remove('container--hide')

        })
    } catch (error) {
        alert(error.message)
    }
}

//   Landing 

var landingButtons = landing.querySelectorAll('button')

var landingSingInButton = landingButtons[0]
var landingSingUpButton = landingButtons[1]

landingSingInButton.onclick = function () {
    landing.classList.add('container--hide')

    signIn.classList.remove('container--hide')
}

landingSingUpButton.onclick = function () {
    landing.classList.add('container--hide')

    signUp.classList.remove('container--hide')
}

//   Sign In

var signInButtonSignIn = signIn.querySelector('button')
var signInLinkSignUp = signIn.querySelector('a')

signInLinkSignUp.onclick = function (event) {
    event.preventDefault()

    signIn.classList.add('container--hide')
    signUp.classList.remove('container--hide')
}

var signInForm = signIn.querySelector('.sign-in__form')

signInForm.onsubmit = function (event) {

    event.preventDefault()

    var inputs = signInForm.querySelectorAll('input')

    var usernameInput = inputs[0]
    var passwordInput = inputs[1]

    var username = usernameInput.value
    var password = passwordInput.value

    signIn.classList.add('container--hide')
    spinner.classList.remove('container--hide')

    try {
        signinUser(username, password, function (error, token) {
            if (error) {
                alert(error.message)

                spinner.classList.add('container--hide')
                signIn.classList.remove('container--hide')

                return

            }

            sessionStorage.token = token

            signInForm.reset()

            try {
                retrieveUser(sessionStorage.token, function (error, user) {
                    if (error) {
                        alert(error.message)

                        spinner.classList.add('container--hide')
                        signIn.classList.remove('container--hide')

                        return
                    }

                    var name = user.name

                    spinner.classList.add('container--hide')

                    var nameSpan = home.querySelector('.name')

                    nameSpan.innerText = name

                    home.classList.remove('container--hide')
                })
            } catch (error) {
                alert(error.message)

                spinner.classList.add('container--hide')
                signIn.classList.remove('container--hide')
            }

        })
    } catch (error) {
        alert(error.message)

        spinner.classList.add('container--hide')
        signIn.classList.remove('container--hide')
    }

}

//     Sign Up

var signUpButtonSignUp = signUp.querySelector('button')
var signUpLinkSignIn = signUp.querySelector('a')

signUpLinkSignIn.onclick = function (event) {
    event.preventDefault()

    signUp.classList.add('container--hide')
    signIn.classList.remove('container--hide')
}

var signUpForm = signUp.querySelector('.sign-up__form')

signUpForm.onsubmit = function (event) {
    event.preventDefault()

    var inputs = signUpForm.querySelectorAll('input')

    var nameInput = inputs[0]
    var usernameInput = inputs[1]
    var emailInput = inputs[2]
    var passwordInput = inputs[3]
    var checkboxInput = inputs[4]


    var name = nameInput.value
    var username = usernameInput.value
    var email = emailInput.value
    var password = passwordInput.value

    signUp.classList.add('container--hide')
    spinner.classList.remove('container--hide')

    try {
        signupUser(name, username, email, password, function (error) {
            if (error) {
                alert(error.message)

                spinner.classList.add('container--hide')
                signUp.classList.remove('container--hide')

                return

            }
            signUpForm.reset()

            signUp.classList.add('container--hide')
            spinner.classList.add('container--hide')

            thankYou.classList.remove('container--hide')

        })
    } catch (error) {
        alert(error.message)

        spinner.classList.add('container--hide')
        signUp.classList.remove('container--hide')
    }

}

//        Thankyou 

var thankYouButon = thankYou.querySelector('button')

thankYouButon.onclick = function (event) {
    event.preventDefault()

    thankYou.classList.add('container--hide')
    spinner.classList.add('container--hide')
    signIn.classList.remove('container--hide')
}

//        Home 

var homeButons = home.querySelectorAll('button')
var homeButon1 = homeButons[0]
var homeButon2 = homeButons[1]
var homeButon3 = homeButons[2]
var homeButon4 = homeButons[3]

homeButon1.onclick = function (event) {
    event.preventDefault()
    home.classList.add('container--hide')
    profile.classList.remove('container--hide')

}

homeButon2.onclick = function () {
    delete sessionStorage.token

    home.classList.add('container--hide')

    landing.classList.remove('container--hide')

}

homeButon4.onclick = function () {

    homeDetail.classList.add('container--hide')
    homeResultsList.classList.remove ('container--hide')
    
}

var profileButtons = profile.querySelectorAll('button')
var goBackButton = profileButtons[0]
var updateButton = profileButtons[1]
var unregisterButton = profile.querySelector('.profile>button')

goBackButton.onclick = function (event) {
    event.preventDefault()

    profile.classList.add('container--hide')
    home.classList.remove('container--hide')

}

//      Profile

var profileForm = profile.querySelector('.profile__inputs')

profileForm.onsubmit = function (event) {

    event.preventDefault()

    var inputs = profileForm.querySelectorAll('input')

    var oldPasswordInput = inputs[0]
    var passwordInput = inputs[1]

    var oldPassword = oldPasswordInput.value
    var password = passwordInput.value

    profile.classList.add('container--hide')
    spinner.classList.remove('container--hide')

    try {
        updateUserPassword(sessionStorage.token, oldPassword, password, function (error) {
            if (error) {
                alert(error.message)

                spinner.classList.remove('container--hide')
                profile.classList.add('container--hide')

                return
            }

            profile.classList.add('container--hide')
            spinner.classList.add('container--hide')
            profileForm.reset()

            home.classList.remove('container--hide')

        })
    } catch (error) {
        alert(error.message)
        spinner.classList.remove('container--hide')
        profile.classList.add('container--hide')

    }
}

//       Unregister

unregisterButton.onclick = function () {


    profile.classList.add('container--hide')
    unregister.classList.remove('container--hide')

}

var unregisterButtons = unregister.querySelectorAll('.button')
var gobackUnregister = unregisterButtons[0]



gobackUnregister.onclick = function (event) {
    event.preventDefault()

    unregister.classList.add('container--hide')
    profile.classList.remove('container--hide')
}



var unregisterForm = unregister.querySelector('form')

unregisterForm.onsubmit = function (event) {
    event.preventDefault()

    var passwordInput = unregisterForm.querySelector('input')

    var password = passwordInput.value


    unregister.classList.add('container--hide')
    spinner.classList.remove('container--hide')

    try {
        unregisterUser(sessionStorage.token, password, function (error) {
            if (error) {
                alert(error.message)

                spinner.classList.remove('container--hide')
                unregister.classList.add('container--hide')

            }

            unregister.classList.add('container--hide')
            spinner.classList.add('container--hide')

            unregisterForm.reset()

            landing.classList.remove('container--hide')
            delete sessionStorage.token
        })
    } catch (error) {
        alert(error.message)
        spinner.classList.remove('container--hide')
        unregister.classList.add('container--hide')
    }
}

var homeSearchForm = home.querySelector('.home__search')
var homeResultsList = home.querySelector('.home__results')
var homeDetail = home.querySelector('.home__detail')

homeSearchForm.onsubmit = function (event) {
    event.preventDefault()

    var queryInput = homeSearchForm.querySelector('#query')

    var query = queryInput.value

    try {
        searchVehicles(query, function (error, vehicles) {
            if (error) return alert(error.message)

            homeDetail.classList.add('container--hide')
            homeResultsList.classList.remove ('container--hide')

            homeResultsList.innerHTML = ''

            vehicles.forEach(function (vehicle) {
                var item = document.createElement('li')

                var image = document.createElement('img')
                image.src = vehicle.thumbnail

                var title = document.createElement('h2')
                title.innerText = vehicle.name

                var price = document.createElement('span')
                price.innerText = vehicle.price + ' $'

                item.append(image, title, price)

                item.classList.add('home__results')

                item.onclick = function () {
                    try {

                        retrieveVehicle(vehicle.id, function (error, vehicle) {
                            if (error) return alert(error.message)

                            homeResultsList.classList.add('container--hide')

                            var title = homeDetail.querySelector('h2')
                            title.innerText = vehicle.name

                            var image = homeDetail.querySelector('img')
                            image.src = vehicle.image

                            var description = homeDetail.querySelector('p')
                            description.innerText = vehicle.description

                            var year = homeDetail.querySelector('time')
                            year.innerText = vehicle.year

                            var other = homeDetail.querySelectorAll('span')

                            other[0].innerText = vehicle.price
                            other[1].innerText = vehicle.color
                            other[2].innerText = vehicle.style
                            other[3].innerText = vehicle.collection
                            other[4].innerText = vehicle.maker

                            var link = homeDetail.querySelector('a')
                            link.src = vehicle.url

                            homeDetail.classList.remove('container--hide')

                        })
                    } catch (error) {
                        alert(error.message)
                    }
                }

                homeResultsList.append(item)
            })
        })
    } catch (error) {
        alert(error.message)
    }
}




