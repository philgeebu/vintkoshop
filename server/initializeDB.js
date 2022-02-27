import userDB from './model/userDB.js'
const User = userDB.getModel()

// Initialize default user accounts (admin and user)
const defaultInitialize = async (req, res) => {
    try {
        await User.collection.drop()
        console.log('Current "User" collection dropped. Moving on...')
    } catch (err) {
        if (err.code === 26) console.log('No "User" collection to drop. Moving on...')
        else console.log(err)
    }
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
    console.log('"User" collection and default users (re)created:')
    console.log(await User.find({}))
    process.exit()
}

defaultInitialize()