import mongoose from 'mongoose'
import dbUrl from './dbUrl.js'

let Schema = mongoose.Schema

let messageSchema = new Schema({
    comment: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    watchID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WatchModel'
    }
}, {
    collection: 'messages',
    timestamps: true,
})

// Only allows a user to submit 1 message per watch
messageSchema.index({ userID: 1, watchID: 1}, { unique: true })

export default {
    getModel: () => {
        let connection = mongoose.createConnection(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        return connection.model("MessageModel", messageSchema)
    }
}