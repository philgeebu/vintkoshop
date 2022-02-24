import userDB from '../model/userDB.js'
const User = userDB.getModel()

// Add user view
export const userAdd = (req, res) => {
    return res.render('user/userAddView', {
        title: "Add User",
        user: req.session.user
    })
}

// Edit user view
export const userEdit = (req, res) => {
    const id = req.params.id
    // Find user and send information to edit form
    User.findById(id, (err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        return res.render('user/userEditView', {
            title: "Edit User",
            data: {
                id: user._id,
                email: user.email,
                password: user.password,
                admin: user.admin,
                updatedAt: user.updatedAt
            },
            user: req.session.user
        })
    })
}

// List users view
export const userList = (req, res) => {
    // Find all users and render html
    User.find({}, (err, users) => {
        if (err || !users) return res.render('error', {
            title: 'Error',
            msg: err || 'No users found.',
            user: req.session.user
        })
        const results = users.map(user => {
            return {
                id: user._id,
                email: user.email,
                password: user.password,
                admin: user.admin,
                updatedAt: user.updatedAt
            }
        })
        return res.render('user/userListView', {
            title: "User List",
            data: results,
            user: req.session.user
        })
    })
}

// Save user
export const userSave = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        admin: Boolean(req.body.admin)
    })
    // save user and redirect to edit page
    user.save((err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        return res.redirect('/users/edit/' + user._id)
    })
}

// Update user
export const userUpdate = (req, res) => {
    const id = req.body.id
    // Find user, update values, save, and reload page
    User.findById(id, (err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        user.email = req.body.email
        user.password = req.body.password
        user.admin = Boolean(req.body.admin)
        user.save((err) => {
            if (err) return res.render('error', {
                title: 'Error',
                msg: err,
                user: req.session.user
            })
            return res.redirect('back')
        })
    })
}

// Delete user
export const userDelete = (req, res) => {
    const id = req.params.id
    // Find user and remove them, then redirect back to user list
    User.findById(id, (err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        user.remove((err) => {
            if (err) return res.render('error', {
                title: 'Error',
                msg: err,
                user: req.session.user
            })
            return res.redirect('/users')
        })
    })
}