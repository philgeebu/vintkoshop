import fs from 'fs'
import watchDB from '../model/watchDB.js'
const Watch = watchDB.getModel()

// Add watch view
export const watchAdd = (req, res) => {
    res.render('watch/watchAddView', {
        title: "Add Watch",
        user: req.session.user
    })
}

// Individual watch view
export const watchIndividualView = (req, res) => {
    const id = req.params.id
    // check the format of the request, and respond with appropriate formats
    res.format({
        // JSON
        'application/json': () => {
            Watch.findById(id, (err, watch) => {
                res.end(JSON.stringify(watch))
            })
        },
        // HTML
        'text/html': () => {
            Watch.findById(id, (err, watch) => {
                if (err) return res.render('error', {
                    title: 'Error',
                    msg: err,
                    user: req.session.user
                })
                res.render('watch/watchIndividualView', {
                    title: "View Watch",
                    data: {
                        id: watch._id,
                        brand: watch.brand,
                        model: watch.model,
                        year: watch.year,
                        color: watch.color,
                        description: watch.description,
                        price: watch.price,
                        picturePath: watch.picturePath,
                        updatedAt: watch.updatedAt,
                    },
                    user: req.session.user
                })
            })
        },
        // provide a 404 error
        'default': () => {
            res.status(404);
            res.send("<b>404 - Not Found</b>");
        }
    })

}

// Edit watch view
export const watchEdit = (req, res) => {
    const id = req.params.id

    Watch.findById(id, (err, watch) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        res.render('watch/watchEditView', {
            title: "Edit Watch",
            data: {
                id: watch._id,
                brand: watch.brand,
                model: watch.model,
                year: watch.year,
                color: watch.color,
                description: watch.description,
                price: watch.price,
                picturePath: watch.picturePath,
                updatedAt: watch.updatedAt,
            },
            user: req.session.user
        })
    })
}

// List watches view
export const watchList = (req, res) => {
    // check the format of the request, and respond with appropriate formats
    res.format({
        // JSON
        'application/json': () => {
            Watch.find({}, (err, watches) => {
                res.end(JSON.stringify(watches))
            })
        },
        // HTML
        'text/html': () => {
            Watch.find({}, (err, watches) => {
                if (err) return res.render('error', {
                    title: 'Error',
                    msg: err,
                    user: req.session.user
                })
                const results = watches.map(watch => {
                    return {
                        id: watch._id,
                        brand: watch.brand,
                        model: watch.model,
                        year: watch.year,
                        color: watch.color,
                        description: watch.description,
                        price: watch.price,
                        picturePath: watch.picturePath,
                        updatedAt: watch.updatedAt,
                    }
                })
                res.render('watch/watchListView', {
                    title: 'Watch List',
                    data: results,
                    user: req.session.user
                })
            })
        },
        // provide a 404 error
        'default': () => {
            res.status(404);
            res.send("<b>404 - Not Found</b>");
        }
    })
}

// Save watch
export const watchSave = (req, res) => {
    const watch = new Watch({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        picturePath: req.file ? req.file.filename : '',
    })
    watch.save((err, watch) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        res.redirect('/watches/edit/' + watch._id)
    })
}

// Update watch
export const watchUpdate = (req, res) => {
    const id = req.body.id

    Watch.findById(id, (err, watch) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        let picToDelete = req.file || req.body.pictureRemove ? './public/watchuploads/' + watch.picturePath : ''
        watch.brand = req.body.brand
        watch.model = req.body.model
        watch.year = req.body.year
        watch.color = req.body.color
        watch.description = req.body.description
        watch.price = req.body.price
        watch.picturePath = req.body.pictureRemove ? '' : req.file ? req.file.filename : watch.picturePath
        watch.save((err) => {
            if (err) return res.render('error', {
                title: 'Error',
                msg: err,
                user: req.session.user
            })
            fs.unlink(picToDelete, () => {
                res.redirect('back')
            })
        })
    })
}

// Delete watch
export const watchDelete = (req, res) => {
    const id = req.params.id

    Watch.findById(id, (err, watch) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        let picToDelete = './public/watchuploads/' + watch.picturePath
        watch.remove((err) => {
            if (err) return res.render('error', {
                title: 'Error',
                msg: err,
                user: req.session.user
            })
            fs.unlink(picToDelete, () => {
                res.redirect('/')
            })
        })
    })
}