import userDB from '../model/userDB.js'
const User = userDB.getModel()

// Add user view
export const userAdd = (req, res) => {
    res.render('user/userAddView', {
        title: "Add User"
    })
}

// List users view
export const userList = async (req, res, next) => {
    const users = await User.find({})

    const results = users.map(user => {
        return {
            id: user._id,
            username: user.username,
            password: user.password,
            email: user.email,
            admin: user.admin
        }
    })
    res.render('user/userListView', {
        title: "User List",
        data: results
    })
}