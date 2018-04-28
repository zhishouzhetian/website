import fs from 'fs'
import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'
// import multer from 'multer'
// import fs from 'fs'
// const UPLOAD_PATH = './uploads'

// import api from './api'

const app = express()
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
let models = require('./dbconfig')

// session 中间件
app.use(session({
  key: 'ckey',
  secret: 'chen',
  cookie: {
    // ms
    maxAge: 1 * 60 * 60 * 1000,
    secure: false,
    sameSite: false
  },
  store: new MySQLStore(models.mysql),
  connectionLimit: 10,
  expiration: 86400000,
  resave: false,
  saveUninitialized: true
}))

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// app.use(bodyParser)
// app.use(express.bodyParser({uploadDir: './uploads'}))
// post请求转化为json
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// 设置静态目录
app.use(express.static(__dirname + '/upload_tmp'))
app.use(express.static('upload_tmp'))
// 拦截徐恒目录
app.use('/xuheng', function (req, res, next) {
  if (req.session.user) {  // 判断用户是否登录
    console.log('002')
    next()
  } else {
    // 解析用户请求的路径
    var url = req.originalUrl ? req.originalUrl : req.url
    var arr = url.split('/')
    // 去除 GET 请求路径上携带的参数
    for (var i = 0, length = arr.length; i < length; i++) {
      arr[i] = arr[i].split('?')[0]
    }
    // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
    if (arr.length > 1 && arr[1] == '') {
      console.log(req.originalUrl)
      console.log(req.url)
      console.log(arr)
      next()
    } else if (arr.length > 2 && arr[1] == 'login' && (arr[2] == 'register' || arr[2] == 'index' || arr[2] == 'logout')) {
      console.log('004')
      next()
    } else {  // 登录拦截
      console.log(arr)
      console.log(req.originalUrl)
      req.session.originalUrl = req.originalUrl ? req.originalUrl : null  // 记录用户原始请求路径
      res.redirect('/login')  // 将用户重定向到登录页面
    }
  }
})
// Import Routes
let api = require('./api/index')(app)

app.set('port', port)

// Import API Routes
// app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
