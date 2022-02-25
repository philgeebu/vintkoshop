import mongoose from 'mongoose'
import dbUrl from './dbUrl.js'

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    admin: Boolean
}, {
    collection: 'users',
    timestamps: true,
})

export default {
    getModel: () => {
        const connection = mongoose.createConnection(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return connection.model("UserModel", userSchema)
    }
}