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
    // Check the format of the request then respond with appropriate formats
    return res.format({
        // JSON
        'application/json': () => {
            // Find individual watch
            Watch.findById(id, (err, watch) => {
                if (err) res.send("Failed")
                res.setHeader('Content-Type', 'application/json')
                return res.send(JSON.stringify(watch))
            })
        },
        // HTML
        'text/html': () => {
            // Find individual watch
            Watch.findById(id, (err, watch) => {
                if (err) return res.render('error', {
                    title: 'Error',
                    msg: err,
                    user: req.session.user
                })
                return res.render('watch/watchIndividualView', {
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
        // Provide a 404 error
        'default': () => {
            res.status(404)
            return res.send("<b>404 - Not Found</b>")
        }
    })

}

// Edit watch view
export const watchEdit = (req, res) => {
    const id = req.params.id
    // Find watch then send information to edit form
    Watch.findById(id, (err, watch) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        return res.render('watch/watchEditView', {
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
    // Check the format of the request then respond with appropriate formats
    return res.format({
        // JSON
        'application/json': () => {
            // Find all watches
            Watch.find({}, (err, watches) => {
                if (err) res.send("Failed")
                res.setHeader('Content-Type', 'application/json')
                return res.send(JSON.stringify(watches))
            })
        },
        // HTML
        'text/html': () => {
            // Find all watches
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
                return res.render('watch/watchListView', {
                    title: 'Watch List',
                    data: results,
                    user: req.session.user
                })
            })
        },
        // Provide a 404 error
        'default': () => {
            res.status(404);
            return res.send("<b>404 - Not Found</b>");
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
    // Save watch then redirect to edit page
    watch.save((err, watch) => {
        if (err) return res.render('error', {
            title: 'Error',
            msg: err,
            user: req.session.user
        })
        return res.redirect('/watches/edit/' + watch._id)
    })
}

// Update watch
export const watchUpdate = (req, res) => {
    const id = req.body.id
    // Find watch, update values, save, then reload page
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
                return res.redirect('back')
            })
        })
    })
}

// Delete watch
export const watchDelete = (req, res) => {
    const id = req.params.id
    // Find watch and remove then redirect back to watch list
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
                return res.redirect('/')
            })
        })
    })
}