import messageDB from '../model/messageDB.js'
const Message = messageDB.getModel()

export const messageList = (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err
        })
        res.render('message/messageListView', {
            title: "Message List",
        })
    })
}