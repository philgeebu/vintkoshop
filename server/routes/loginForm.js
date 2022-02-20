export default async (req, res, next) => {
    res.render('loginFormView', {
        title: "Login Form"
    })
}