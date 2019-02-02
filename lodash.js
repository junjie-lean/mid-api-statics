const _ = require('lodash');

var a = [
    { v: 1 },
    { v: 2 },
    { v: 3 },
    { v: 4 },
]

var b = _.filter(a, (o) => { return o.v > 1 });

console.log(b)