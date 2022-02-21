import express from 'express'
import routes from './routes/index.js'
import session from 'express-session'
import {
    engine
} from 'express-handlebars';

const app = express()

// View Engine (Handlebars)
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// Static Directory(s)
app.use(express.static('public'))

// Body-Parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Initialize Express Session
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}))

// Routing
app.use('/', routes)
app.use(function (req, res) {
    res.status(404).render('404')
})

app.listen(3000, function () {
    console.log('http://localhost:3000');
})