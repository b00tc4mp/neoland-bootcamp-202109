console.log('TEST countNumbers')

// CASE 1

var res = countNumbers([1, 2, 3])

if (res instanceof Array
    && res.length === 3
    && res[0] === 6
    && res[1] === 0
    && res[2] === 6)
    console.log('test ok')
else
    console.error('test failed')

// CASE 2

var res = countNumbers([1, -2, 3])

if (res instanceof Array
    && res.length === 3
    && res[0] === 4
    && res[1] === -2
    && res[2] === 2)
    console.log('test ok')
else
    console.error('test failed')

// CASE 3

var res = countNumbers([1, 2, -3])

if (res instanceof Array
    && res.length === 3
    && res[0] === 3
    && res[1] === -3
    && res[2] === 0)
    console.log('test ok')
else
    console.error('test failed')

// CASE 4

var res = countNumbers([-7 ,-1, 6])

if (res instanceof Array
    && res.length === 3 
    && res[0] === 6
    && res[1] === -8
    && res[2] === -2)
    console.log('test ok')
else
console.error('test failed')