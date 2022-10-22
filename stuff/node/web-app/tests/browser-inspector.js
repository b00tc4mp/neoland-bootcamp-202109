var xhr = new XMLHttpRequest()

xhr.open('GET', 'http://127.0.0.1:8000/hello?name=Pepito')

xhr.addEventListener('load', function() {
    console.log(xhr.responseText)
})

xhr.send()