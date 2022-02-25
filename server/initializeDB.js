// ============================================
// Create Database and readWrite user

import mongodb from 'mongodb'
const url = "mongodb://localhost:27017"

mongodb.MongoClient.connect(url, async (err, client) => {
    if (err) console.log(err)
    const db = client.db('vintkoshop')
    await db.admin().removeUser('vintko')
    await db.admin().addUser('vintko', 'vintko_secret', {
        roles: [{
            role: 'readWrite',
            db: 'vintkoshop'
        }]
    })
    client.close()
})

// ============================================
// 

import messageDB from './model/messageDB.js'
const Message = messageDB.getModel()
import userDB from './model/userDB.js'
const User = userDB.getModel()
import watchDB from './model/watchDB.js'
const Watch = watchDB.getModel()

Message.collection.drop()
User.collection.drop()
Watch.collection.drop()

// Initialize default user accounts (admin and user)
const defaultInitialize = async (req, res) => {
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

defaultInitialize()