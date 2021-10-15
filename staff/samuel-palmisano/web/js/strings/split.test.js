describe('TEST split')

// CASE 1

var res = split('hola mundo', ' ')

if (res instanceof Array
    && res.length === 2
    && res[0] === 'hola'
    && res[1] === 'mundo')
    success('test 1 ok')
else
    fail('test 1 failed')

// CASE 2

var res = split('adiós mundo cruel', ' ')

if (res instanceof Array
    && res.length === 3
    && res[0] === 'adiós'
    && res[1] === 'mundo'
    && res[2] === 'cruel')
    success('test 2 ok')
else
    fail('test 2 failed')

// CASE 3

var res = split('adiós,mundo,cruel', ',')

if (res instanceof Array
    && res.length === 3
    && res[0] === 'adiós'
    && res[1] === 'mundo'
    && res[2] === 'cruel')
    success('test 3 ok')
else
    fail('test 3 failed')

// CASE 4

var res = split('hola', '')

if (res instanceof Array
    && res.length === 4
    && res[0] === 'h'
    && res[1] === 'o'
    && res[2] === 'l'
    && res[3] === 'a')
    success('test 4 ok')
else
    fail('test 4 failed')

// CASE 5

var res = split('hola', 'ol')

if (res instanceof Array
    && res.length === 2
    && res[0] === 'h'
    && res[1] === 'a')
    success('test 5 ok')
else
    fail('test 5 failed')