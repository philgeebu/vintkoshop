import messageDB from '../model/messageDB.js'
const Message = messageDB.getModel()

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
                watchID: message.watchID,
                userID: message.userID,
                updatedAt: message.updatedAt
            }
        })
        res.render('message/messageListView', {
            title: "Message List",
            data: results,
            user: req.session.user
        })
    })
}

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