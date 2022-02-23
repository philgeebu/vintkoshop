import messageDB from '../model/messageDB.js'
const Message = messageDB.getModel()

export const messageList = (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        res.render('message/messageListView', {
            title: "Message List",
            user: req.session.user
        })
    })
}