export default async (req, res, next) => {
    res.render('message/messageListView', {
        title: "Message List"
    })
}