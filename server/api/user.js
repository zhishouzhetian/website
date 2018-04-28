let express = require('express')
let router = express.Router()

let db = require('../Dao')

router.post('/adduser', (req) => {
  let user2 = req.body.username || ''
  let sql = 'insert into user (id, name) values (0, ?) '
  db.query(sql, [user2], (err) => {
    if (err) {
      return err
    }
  })
})

module.exports = router