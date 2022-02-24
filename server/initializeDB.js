import userDB from './model/userDB.js'
const User = userDB.getModel()

// Initialize default user accounts (admin and user)
const userDefaultInitialize = async (req, res) => {
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

userDefaultInitialize()