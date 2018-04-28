let express = require('express')
let router = express.Router()
let userDao = require('../dao/userDao')

router.post('/login', (req, res) => {
  let user = {
    name: req.body.username || '',
    password: req.body.password || ''
  }
  userDao.queryUser(user, (err, result) => {
    if (err) {
      return err
    }
    if (result.length === 1) {
      req.session.user = result[0].name
      // result = result.map(function (item, index) {
      //   return {
      //     name: item.name,
      //     id: item.id
      //   }
      // })
      console.log(result[0].name + ':login')
      var url = req.session.originalUrl ? req.session.originalUrl : '/'
      res.json(url)
    } else {
      res.json({errCode: '001', msg: '找不到用户！'})
    }
  })
})

router.post('/regist', (req, res) => {
  let user = {
    name: req.body.username || '',
    password: req.body.password || ''
  }
  userDao.addUser(user, (err, result) => {
    if (err) {
      return err
    }
    console.log(result)
    if (result.insertId) {
      req.session.user = user.name
      // result = result.map(function (item, index) {
      //   return {
      //     name: item.name,
      //     id: item.id
      //   }
      // })
      console.log(result.insertId + ':login')
      var url = '/'
      res.json(url)
    } else {
      res.json({errCode: '001', msg: '注册失败！'})
    }
  })
})

module.exports = router
