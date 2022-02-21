import userDB from '../model/userDB.js'
const User = userDB.getModel()

// Login form view
export const loginForm = (req, res, next) => {
    res.render('loginFormView', {
        title: "Login Form"
    })
}

// Login
export const loginVerify = (req, res, next) => {
    console.log(req.body)
    res.redirect('back')
}
