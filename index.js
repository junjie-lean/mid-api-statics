const express = require('express');
const _ = require('lodash');
const static = require('./router/router');
const { db } = require('./db/db-connect');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/view', express.static('./view'));
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.get('/', (req, res) => {
    db.lean();
    res.send('????');
})

app.get('/random', (req, res) => {
    let arr = ['/api/a', '/api/b', '/api/c', '/api/d', '/api/e'];


    let randomArr = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    let pushIndex = Math.floor(Math.random() * randomArr.length);
    let result = randomArr[pushIndex];
    console.log(result)
    db.random(arr[result]);
    res.send(`thx visit${Math.random()}`)
})

app.get('/getdata', (req, res) => {
    let data = 100;
    let data1 = db.get('rows').value().length;
    console.log(db.get('rows').value())
    res.send(`data=${data1}`)
})


app.get('/params', (req, res) => {
    let len = db.get('rows').filter({ username: req.query.data }).size().value();
    console.log(len);
    // res.send('success')

    let resData = {};
    resData[`reqNumOf${req.query.data}`] = len;
    res.json(resData);
})

app.get('/show/all', (req, res) => {
    let data = _.countBy(db.get('rows').value(), 'username');
    // console.log
    let _data = [];
    let now = new Date();
    let min = () => {
        let mini = now.getMinutes() + "";
        if (mini.length == 1) {
            return "00"
        } else {
            return Math.floor(now.getMinutes() / 10) * 10;
        }
    }
    let getDate = (time) => {
        let a = new Date(time);
        return `${a.getFullYear()}/${a.getMonth() + 1}/${a.getDate()} ${a.getHours()}:${a.getMinutes()}`;
    }
    /* 距离当前时间最近的分钟整数 */
    let nowDateString = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:00`;
    for (let key in data) {
        if (key == 'initial' || key == "undefined") {
            continue;
        }
        let rows = db.get('rows').filter({ username: key }).value();
        let limitNowsRows = [];
        let nowDateStringTime = new Date(nowDateString).getTime();
        let nowDateStringTime_10 = (new Date(nowDateString).getTime()) - (1000 * 60 * 1);
        let nowDateStringTime_20 = (new Date(nowDateString).getTime()) - (1000 * 60 * 2);
        let nowDateStringTime_30 = (new Date(nowDateString).getTime()) - (1000 * 60 * 3);
        let nowDateStringTime_40 = (new Date(nowDateString).getTime()) - (1000 * 60 * 4);
        let nowDateStringTime_50 = (new Date(nowDateString).getTime()) - (1000 * 60 * 5);
        let nowDateStringTime_60 = (new Date(nowDateString).getTime()) - (1000 * 60 * 6);
        let a = [], b = [], c = [], d = [], e = [], f = [];
        _.find(rows, (obj) => {
            if (obj.createTime < nowDateStringTime) {
                limitNowsRows.push(obj);
            }
            if (obj.createTime < nowDateStringTime_10) {
                a.push(obj);
            }
            if (obj.createTime < nowDateStringTime_20) {
                b.push(obj);
            }
            if (obj.createTime < nowDateStringTime_30) {
                c.push(obj);
            }
            if (obj.createTime < nowDateStringTime_40) {
                d.push(obj);
            }
            if (obj.createTime < nowDateStringTime_50) {
                e.push(obj);
            }
            if (obj.createTime < nowDateStringTime_60) {
                f.push(obj);
            }
        })
        _data.push(
            // {
            //     type: key,
            //     date: getDate(nowDateStringTime_50),
            //     value: e.length - f.length
            // },
            // {
            //     type: key,
            //     date: getDate(nowDateStringTime_40),
            //     value: d.length - e.length
            // },
            // {
            //     type: key,
            //     date: getDate(nowDateStringTime_30),
            //     value: c.length - d.length
            // },
            // {
            //     type: key,
            //     date: getDate(nowDateStringTime_20),
            //     value: b.length - c.length
            // },
            // {
            //     type: key,
            //     date: getDate(nowDateStringTime_10),
            //     value: a.length - b.length
            // }
        )

        
    }
    res.json({
        data: _data
    })
})

app.listen(30000, (err) => {
    if (err) {
        throw new Error(err.message);
    }
    console.log('server stat at 30000');
})
