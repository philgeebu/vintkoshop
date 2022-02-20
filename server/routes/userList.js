export default async (req, res, next) => {
    res.render('user/userListView', {
        title: "User List"
    })
}