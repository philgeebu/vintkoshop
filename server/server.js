import express from 'express'
import bodyparser from 'body-parser'
import routes from './routes/index.js'
import {
    engine
} from 'express-handlebars';

const APP = express()

APP.engine('handlebars', engine())
APP.set('view engine', 'handlebars')

APP.use(express.static('/public'))

APP.use(bodyparser.json())
APP.use(bodyparser.urlencoded({
    extended: false
}))

APP.use('/', routes)
APP.use(function (req, res) {
    res.status(404)
    res.render('404')
})

APP.listen(3000, function () {
    console.log('http://localhost:3000');
})