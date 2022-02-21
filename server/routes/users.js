import userDB from '../model/userDB.js'
const User = userDB.getModel()

// Add user view
export const userAdd = (req, res) => {
    res.render('user/userAddView', {
        title: "Add User"
    })
}

// Edit user view
export const userEdit = (req, res) => {
    const id = req.params.id

    User.findById(id, (err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err
        })
        res.render('user/userEditView', {
            title: "Edit User",
            data: {
                id: user._id,
                email: user.email,
                password: user.password,
                admin: user.admin,
                updatedAt: user.updatedAt
            }
        })
    })
}

// List users view
export const userList = async (req, res, next) => {
    const users = await User.find({})

    const results = users.map(user => {
        return {
            id: user._id,
            email: user.email,
            password: user.password,
            admin: user.admin,
            updatedAt: user.updatedAt
        }
    })
    res.render('user/userListView', {
        title: "User List",
        data: results
    })
}

// Save user
export const userSave = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        admin: Boolean(req.body.admin)
    })
    user.save((err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err
        })
        res.redirect('/users/edit/' + user._id)
    })
}

// Update user
export const userUpdate = (req, res) => {
    const id = req.body.id

    User.findById(id, (err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err
        })
        user.email = req.body.email
        user.password = req.body.password
        user.admin = Boolean(req.body.admin)
        user.save((err) => {
            if (err) return res.render('error', {
                title: 'Error',
                msg: err
            })
            res.redirect('back')
        })
    })
}

// Delete user
export const userDelete = (req, res) => {
    const id = req.params.id

    User.findById(id, (err, user) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err
        })
        user.remove((err) => {
            if (err) return res.render('error', {
                title: 'Error',
                msg: err
            })
            res.redirect('/users')
        })
    })
}