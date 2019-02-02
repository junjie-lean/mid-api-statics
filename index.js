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
    // console.log(result)
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
        let nowDateStringTime = new Date(nowDateString).getTime();

        let a = [], b = [], c = [], d = [], e = [], f = [];
        let oneMinute = 1000 * 60;

        let limitArr = _.filter(rows, (o) => {
            return o.createTime < nowDateStringTime - oneMinute * 1
        });

        _.find(rows, (obj) => {
            if (obj.createTime < nowDateStringTime - oneMinute * 1) {
                //1分钟前的总数
                a.push(obj);
            }
            if (obj.createTime < nowDateStringTime - oneMinute * 2) {
                //2分钟前的总数
                b.push(obj);
            }
            if (obj.createTime < nowDateStringTime - oneMinute * 3) {
                c.push(obj);
            }
            if (obj.createTime < nowDateStringTime - oneMinute * 4) {
                d.push(obj);
            }
            if (obj.createTime < nowDateStringTime - oneMinute * 5) {
                e.push(obj);
            }
            if (obj.createTime < nowDateStringTime - oneMinute * 6) {
                f.push(obj);
            }
        })
        _data.push({
            name: key,
            // "一分钟前数据": a.length,
            // "两分钟前数据": b.length,
            // "三分钟前数据": c.length,
            // "四分钟前数据": d.length,
            // "五分钟前数据": e.length,
            MinuteAgo1: a.length - b.length,
            MinuteAgo2: b.length - c.length,
            MinuteAgo3: c.length - d.length,
            MinuteAgo4: d.length - e.length,
            MinuteAgo5: e.length - f.length,
        })
    }
    // let resonData = [];
    // _data.map(item => {

    //     resonData.push()
    // })

   
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
