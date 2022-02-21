import userDB from '../model/userDB.js'
const User = userDB.getModel()

// Sign In form view
export const signInForm = (req, res) => {
    res.render('signInFormView', {
        title: "Sign In"
    })
}

// Sign In
export const signIn = (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if (err || !user) return res.render('signInFormView', {
            title: 'Sign In',
            msg: err || 'User/password incorrect.'
        })
        req.session.userid = user._id
        req.session.useradmin = user.admin
        res.redirect('/')
    })
}