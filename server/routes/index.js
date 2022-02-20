import express from 'express'
import multer from 'multer'
const upload = multer({ dest: './public/uploads/' })
const router = express.Router()

// Watches
import * as watch from './watches.js'
router.get('/', function (req, res) {res.redirect('/watches')})
router.get('/watches', watch.watchList)
router.get('/watches/add', watch.watchAdd)
router.post('/watches/add', upload.single('picturePath'), watch.watchSave)
router.get('/watches/edit/:id', watch.watchEdit)
router.post('/watches/edit', upload.single('picturePath'), watch.watchUpdate)
router.get('/watches/delete/:id', watch.watchDelete)

// Messages
import messageList from './messageList.js'
router.get('/messages', messageList)

// Users
import userList from './userList.js'
router.get('/users', userList)

// Login Form
import loginForm from './loginForm.js'
router.get('/login', loginForm)

export default router