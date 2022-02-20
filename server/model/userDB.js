import mongoose from 'mongoose'
import dbUrl from './dbUrl.js'

let Schema = mongoose.Schema

let userSchema = new Schema({
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
        let connection = mongoose.createConnection(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return connection.model("UserModel", userSchema)
    }
}