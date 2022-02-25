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

// Custom middleware to check for admin-only routes
const checkForAdmin = (req, res, next) => {
    if (req.session.user)
        if (req.session.user.admin) return next()
    return res.render('error', {
        title: 'Error',
        msg: 'You must have admin permissions to access this page.',
        user: req.session.user
    })
}

// Watch routes
import * as watches from './watches.js'
router.get('/', function (req, res) {return res.redirect('/watches')})
router.get('/watches', watches.watchList)
router.get('/watches/add', checkForAdmin, watches.watchAdd)
router.post('/watches/add', checkForAdmin, upload.single('picturePath'), watches.watchSave)
router.get('/watches/edit/:id', checkForAdmin, watches.watchEdit)
router.post('/watches/edit', checkForAdmin, upload.single('picturePath'), watches.watchUpdate)
router.get('/watches/delete/:id', checkForAdmin, watches.watchDelete)
router.get('/watches/:id', watches.watchIndividualView)

// User routes
import * as users from './users.js'
router.get('/users', checkForAdmin, users.userList)
router.get('/users/add', checkForAdmin, users.userAdd)
router.post('/users/add', checkForAdmin, users.userSave)
router.get('/users/edit/:id', checkForAdmin, users.userEdit)
router.post('/users/edit', checkForAdmin, users.userUpdate)
router.get('/users/delete/:id', checkForAdmin, users.userDelete)

//Sign in routes
import * as signIn from './signIn.js'
router.get('/signin', signIn.signInForm)
router.post('/signin', signIn.signIn)
router.get('/signout', signIn.signOut)

// Message routes
import * as messages from './messages.js'
router.get('/messages', checkForAdmin, messages.messageList)
router.post('/messages/ask', messages.messageAdd)
router.get('/messages/delete/:id', checkForAdmin, messages.messageDelete)

export default router