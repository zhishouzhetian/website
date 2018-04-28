var fs = require('fs')
var express = require('express')
var multer = require('multer')

var router = express.Router()
// var upload = multer({dest: 'upload_tmp/'})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload_tmp/')    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({storage: storage})

router.post('/upload', upload.any(), function (req, res, next) {
  console.log(req.files[0])  // 上传的文件信息
  res.end(req.files[0].filename) // 响应返回文件名
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
})

module.exports = router