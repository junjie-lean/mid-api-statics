const http = require('http');

setInterval(() => {
    let request = http.get('http://10.10.1.30:30000/random');
    request.setTimeout = 0;
    request.once('response', (res) => {
        res.on('data', (chunk) => {
            // console.log(chunk.toString());
        })
        res.on('error', (err) => {
            process.exit();
        })
        res.on('end', () => {
            console.log('request end => ' + Math.random() )
        })
    })

}, 400)