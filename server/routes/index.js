import express from 'express'
import multer from 'multer'
import path from 'path'

// Multer configuration
const storage = multer.diskStorage({
    destination: './public/watchuploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname.substring(0, 10) + '-' + Date.now() +
            path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

// Initialize router
const router = express.Router()

// Watche routes
import * as watches from './watches.js'
router.get('/', function (req, res) {res.redirect('/watches')})
router.get('/watches', watches.watchList)
router.get('/watches/add', watches.watchAdd)
router.post('/watches/add', upload.single('picturePath'), watches.watchSave)
router.get('/watches/edit/:id', watches.watchEdit)
router.post('/watches/edit', upload.single('picturePath'), watches.watchUpdate)
router.get('/watches/delete/:id', watches.watchDelete)

// User routes
import * as users from './users.js'
router.get('/users', users.userList)
router.get('/users/add', users.userAdd)
router.post('/users/add', users.userSave)
router.get('/users/edit/:id', users.userEdit)
router.post('/users/edit', users.userUpdate)
router.get('/users/delete/:id', users.userDelete)

// Login routes
import * as login from './login.js'
router.get('/login', login.loginForm)
router.post('/login', login.loginVerify)

// Message routes
import messageList from './messageList.js'
router.get('/messages', messageList)


export default router