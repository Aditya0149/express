var mysql = require('mysql')
var db = {};
db.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cricket_ayojak'
})

db.connection.connect(
  function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + db.connection.threadId);
  }
)

db.simpleQuery = (sql,...params) => {
  return new Promise((resolve,reject) => {
    db.connection.query(sql, params, (err, rows, fields) => {
      console.log('rows ',params);
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
  })
}

module.exports = db;