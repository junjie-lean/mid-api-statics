const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const all = new FileSync('./db/tables/allLog.json')
const db = low(all);


const dataStructure = {
    rows: [

    ],
}



db.defaults(dataStructure).write();

db.lean = () => {
    console.log('lean');
};


module.exports = {
    db
}