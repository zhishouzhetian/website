require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  mysql: {
    host: 'localhost',
    user: 'chen',
    password: 'P@ssw0rd',
    database: 'jcp_sys',
    port: '3306'
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var models = __webpack_require__(2);
var mysql = __webpack_require__(11);

var pool = mysql.createPool(models.mysql);

var query = function query(sql, params, callback) {
  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        return callback(true);
      }
      //链接
      connection.query(sql, params, function (err, result) {
        //释放链接
        connection.release();
        if (err) {
          console.error('db error01:' + err);
          return callback(true);
        }
        callback(false, result);
      });
    });
  } catch (err) {
    console.error('db error02:' + err);
    return callback(true);
  }
};

module.exports.query = query;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);




// import multer from 'multer'
// import fs from 'fs'
// const UPLOAD_PATH = './uploads'

// import api from './api'

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var session = __webpack_require__(7);
var MySQLStore = __webpack_require__(8)(session);
var models = __webpack_require__(2);

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
}));

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

// app.use(bodyParser)
// app.use(express.bodyParser({uploadDir: './uploads'}))
// post请求转化为json
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());
// 设置静态目录
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__dirname + '/upload_tmp'));
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static('upload_tmp'));
// 拦截徐恒目录
app.use('/xuheng', function (req, res, next) {
  if (req.session.user) {
    // 判断用户是否登录
    console.log('002');
    next();
  } else {
    // 解析用户请求的路径
    var url = req.originalUrl ? req.originalUrl : req.url;
    var arr = url.split('/');
    // 去除 GET 请求路径上携带的参数
    for (var i = 0, length = arr.length; i < length; i++) {
      arr[i] = arr[i].split('?')[0];
    }
    // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
    if (arr.length > 1 && arr[1] == '') {
      console.log(req.originalUrl);
      console.log(req.url);
      console.log(arr);
      next();
    } else if (arr.length > 2 && arr[1] == 'login' && (arr[2] == 'register' || arr[2] == 'index' || arr[2] == 'logout')) {
      console.log('004');
      next();
    } else {
      // 登录拦截
      console.log(arr);
      console.log(req.originalUrl);
      req.session.originalUrl = req.originalUrl ? req.originalUrl : null; // 记录用户原始请求路径
      res.redirect('/login'); // 将用户重定向到登录页面
    }
  }
});
// Import Routes
var api = __webpack_require__(9)(app);

app.set('port', port);

// Import API Routes
// app.use('/api', api)

// Import and Set Nuxt.js options
var config = __webpack_require__(17);
config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// import { Router } from 'express'
//
// import users from './users'
//
// const router = Router()
//
// // Add USERS Routes
// router.use(users)
//
// export default router

module.exports = function (app) {
  app.get('/index', function (req, res) {
    res.redirect('/xuheng');
  });
  app.use('/api/user', __webpack_require__(10));
  app.use('/api/upload', __webpack_require__(12));
  app.use('/api/account', __webpack_require__(14));
  //
  // app.use('/api/tag', require('./tag'))
  //
  // app.use('/api/post/tag', require('./postTag'))
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(0);
var router = express.Router();

var db = __webpack_require__(3);

router.post('/adduser', function (req) {
  var user2 = req.body.username || '';
  var sql = 'insert into user (id, name) values (0, ?) ';
  db.query(sql, [user2], function (err) {
    if (err) {
      return err;
    }
  });
});

module.exports = router;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1);
var express = __webpack_require__(0);
var multer = __webpack_require__(13);

var router = express.Router();
// var upload = multer({dest: 'upload_tmp/'})

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'upload_tmp/'); // 保存的路径，备注：需要自己创建
  },
  filename: function filename(req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });

router.post('/upload', upload.any(), function (req, res, next) {
  console.log(req.files[0]); // 上传的文件信息
  res.end(req.files[0].filename); // 响应返回文件名
  // 记录图片
  // var des_file = './upload/' + req.files[0].originalname
  // fs.readFile(req.files[0].path, function (err, data) {
  //   fs.writeFile(des_file, data, function (err) {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       response = {
  //         message: 'File uploaded successfully',
  //         filename: des_file
  //       }
  //       console.log(response)
  //       res.end(JSON.stringify(response))
  //     }
  //   })
  // })
});

module.exports = router;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(0);
var router = express.Router();
var userDao = __webpack_require__(15);

router.post('/login', function (req, res) {
  var user = {
    name: req.body.username || '',
    password: req.body.password || ''
  };
  userDao.queryUser(user, function (err, result) {
    if (err) {
      return err;
    }
    if (result.length === 1) {
      req.session.user = result[0].name;
      // result = result.map(function (item, index) {
      //   return {
      //     name: item.name,
      //     id: item.id
      //   }
      // })
      console.log(result[0].name + ':login');
      var url = req.session.originalUrl ? req.session.originalUrl : '/';
      res.json(url);
    } else {
      res.json({ errCode: '001', msg: '找不到用户！' });
    }
  });
});

router.post('/regist', function (req, res) {
  var user = {
    name: req.body.username || '',
    password: req.body.password || ''
  };
  userDao.addUser(user, function (err, result) {
    if (err) {
      return err;
    }
    console.log(result);
    if (result.insertId) {
      req.session.user = user.name;
      // result = result.map(function (item, index) {
      //   return {
      //     name: item.name,
      //     id: item.id
      //   }
      // })
      console.log(result.insertId + ':login');
      var url = '/';
      res.json(url);
    } else {
      res.json({ errCode: '001', msg: '注册失败！' });
    }
  });
});

module.exports = router;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var db = __webpack_require__(3);
var crypto = __webpack_require__(16);

module.exports = {
  // 验证用户名密码
  queryUser: function queryUser(user, callback) {
    var sql = 'select * from user where name = ? and password = ? ';
    console.log(user);
    // 加密密码
    user.password = crypto.createHash('md5').update(user.password).digest('hex');
    db.query(sql, [user.name, user.password], function (err, result) {
      if (err) {
        return callback(true);
      }
      callback(false, result);
    });
  },

  // 验证用户名密码
  addUser: function addUser(user, callback) {
    var sql = 'insert into user (name, password) values (?, ?) ';
    console.log(user);
    // 加密密码
    user.password = crypto.createHash('md5').update(user.password).digest('hex');
    db.query(sql, [user.name, user.password], function (err, result) {
      if (err) {
        return callback(true);
      }
      callback(false, result);
    });
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'element-ui', 'mint-ui'],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  plugins: ['~plugins/element-ui', '~plugins/mint-ui']
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map