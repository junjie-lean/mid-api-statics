const express = require('express');
const static = require('./router/router');
const { db } = require('./db/db-connect');

const app = express();


app.get('/', (req, res) => {
    db.lean();
    res.send('????');
})

app.listen(30000, (err) => {
    if (err) {
        throw new Error(err.message);
    }
    console.log('server stat at 30000');
})
