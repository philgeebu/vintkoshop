import messageDB from '../model/messageDB.js'
const Message = messageDB.getModel()
import userDB from '../model/userDB.js'
const User = userDB.getModel()
import watchDB from '../model/watchDB.js'
const Watch = watchDB.getModel()


// List messages
export const messageList = (req, res) => {
    // Find all messages then render html
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
        return res.render('message/messageListView', {
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

// Submit message
export const messageAdd = (req, res) => {
    const message = new Message({
        comment: req.body.comment,
        userID: req.body.userID,
        watchID: req.body.watchID
    })
    // Save message then render confirm
    message.save((err, message) => {
        if (err.code === 11000) return res.render('error', {
            title: 'Error',
            msg: "You have already submitted a message for this watch.",
            user: req.session.user
        })
        else if (err) return res.render('error', {
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
    // Find message and remove it then re-render current page
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
            return res.redirect('back')
        })
    })
}