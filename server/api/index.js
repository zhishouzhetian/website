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

module.exports = app => {
  app.get('/index', (req, res) => {
    res.redirect('/xuheng')
  })
  app.use('/api/user', require('./user'))
  app.use('/api/upload', require('./upload'))
  app.use('/api/account', require('./account'))
  //
  // app.use('/api/tag', require('./tag'))
  //
  // app.use('/api/post/tag', require('./postTag'))
}