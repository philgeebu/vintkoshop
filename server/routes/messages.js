import messageDB from '../model/messageDB.js'
const Message = messageDB.getModel()
import userDB from '../model/userDB.js'
const User = userDB.getModel()
import watchDB from '../model/watchDB.js'
const Watch = watchDB.getModel()


// List messages
export const messageList = (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        const results = messages.map(message => {
            return {
                id: message._id,
                comment: message.comment,
                userID: message.userID,
                watchID: message.watchID,
                updatedAt: message.updatedAt
            }
        })
        res.render('message/messageListView', {
            title: "Message List",
            data: results,
            user: req.session.user
        })
    }).populate({
        path: 'userID',
        model: User
    }).populate({
        path: 'watchID',
        model: Watch
    }).lean()
}

// Submit a message
export const messageAsk = (req, res) => {
    const message = new Message({
        comment: req.body.comment,
        userID: req.body.userID,
        watchID: req.body.watchID
    })
    message.save((err, message) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        return res.render('messageConfirm', {
            title: 'Message Received!',
            user: req.session.user
        })
    })
}

// Delete message
export const messageDelete = (req, res) => {
    const id = req.params.id

    Message.findById(id, (err, message) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        message.remove((err) => {
            if (err) return res.render('error', {
                title: 'Error',
                msg: err,
                user: req.session.user
            })
            res.redirect('back')
        })
    })
}