debugger

const { argv: [, , ...nums] } = process

console.log(nums.reduce((accum, num) => accum + Number(num), 0))