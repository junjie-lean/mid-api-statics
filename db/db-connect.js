const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const all = new FileSync('./db/tables/allLog.json')
const db = low(all);

/**
 * @description
 */
const dataStructure = {
    rows: [
        {
            id: 0,
            username: "initial",
            description: "",
            createTime: new Date().getTime(),
            modifyTime: new Date().getTime(),
        }
    ],
}



db.defaults(dataStructure).write();

db.lean = () => {
    console.log('lean');
};

db.random = (apiname) => {
    let id = db.get('rows').value().length;
    db.get('rows').push({
        id,
        username: apiname,
        description: "",
        createTime: new Date().getTime(),
        modifyTime: new Date().getTime(),
    }).write();
}

db._get = () => {
    console.log(12)
    return 12;
}
module.exports = {
    db
}