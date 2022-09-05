import fetch from 'node-fetch'
//import { jsdom } from 'jsdom'
//import querySelectorAll from 'query-selector'

// WARN to test in the browser, first go to google.com

function searchInGoogle(query, callback) {
    fetch('https://www.google.com/search?q=' + query)
        .then(function (response) { return response.text() })
        .then(function (html) {
            var parser = new DOMParser

            var doc = parser.parseFromString(html, 'text/html')

            //var doc = jsdom(html)

            var items = doc.querySelectorAll('.tF2Cxc')
            // var items = querySelectorAll('.tF2Cxc', doc)

            var results = []

            items.forEach(item => {
                var title = item.querySelector('h3').innerText

                var url = item.querySelector('.yuRUbf > a').href

                var preview = item.querySelector('.VwiC3b.yXK7lf.MUxGbd.yDYNvb.lyLwlc.lEBKkf').innerHTML

                results.push({ title, url, preview })
            })

            callback(results)
        })
}

export default searchInGoogle