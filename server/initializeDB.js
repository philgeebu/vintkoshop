import userDB from './model/userDB.js'
const User = userDB.getModel()

// Initialize users (admin and user)
const userInitializeList = async (req, res) => {
    await User.deleteMany({})
    const userAdmin = new User({
        email: 'vintko_admin@vintko.com',
        password: '123123',
        admin: true
    })
    const userRegular = new User({
        email: 'vintko_user@vintko.com',
        password: '123123',
        admin: false
    })

    await Promise.all([
        userAdmin.save(),
        userRegular.save()
    ])
    console.log(await User.find({}))
    process.exit()
}

userInitializeList()