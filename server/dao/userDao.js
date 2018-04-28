let db = require('../Dao')
let crypto = require('crypto')

module.exports =
  {
    // 验证用户名密码
    queryUser (user, callback) {
      let sql = 'select * from user where name = ? and password = ? '
      console.log(user)
      // 加密密码
      user.password = crypto.createHash('md5').update(user.password).digest('hex')
      db.query(sql, [user.name, user.password], (err, result) => {
        if (err) {
          return callback(true)
        }
        callback(false, result)
      })
    },
    // 验证用户名密码
    addUser (user, callback) {
      let sql = 'insert into user (name, password) values (?, ?) '
      console.log(user)
      // 加密密码
      user.password = crypto.createHash('md5').update(user.password).digest('hex')
      db.query(sql, [user.name, user.password], (err, result) => {
        if (err) {
          return callback(true)
        }
        callback(false, result)
      })
    }
  }