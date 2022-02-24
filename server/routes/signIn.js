import userDB from '../model/userDB.js'
const User = userDB.getModel()

// Sign In form view
export const signInForm = (req, res) => {
    return res.render('signInFormView', {
        title: "Sign In"
    })
}

// Sign In
export const signIn = (req, res) => {
    // Find user with provided credentials, then apply credentials to session if user
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if (err || !user) return res.render('signInFormView', {
            title: 'Sign In',
            msg: err || 'User/password incorrect.'
        })
        req.session.user = {
            id: user._id,
            email: user.email,
            admin: user.admin
        }
        return res.redirect('/')
    })
}

// Sign Out
export const signOut = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/')
    })
}