import watchDB from '../model/watchDB.js'
const Watch = watchDB.getModel()

// Add watch view
export const watchAdd = (req, res) => {
    res.render('watch/watchAddView', {
        title: "Add Watch"
    })
}

// Edit watch view
export const watchEdit = (req, res) => {
    const id = req.params.id

    Watch.findById(id, (err, watch) => {
        if (err) console.log(err)
        if (!watch) return res.render('404')
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
                hidden: watch.hidden,
                createdAt: watch.createdAt
            }
        })
    })
}

// List watches view
export const watchList = async (req, res) => {
    const watches = await Watch.find({})

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
            hidden: watch.hidden,
            createdAt: watch.createdAt,
            updatedAt: watch.updatedAt,
        }
    })

    res.render('watch/watchListView', {
        title: 'Watch List',
        data: results
    })
}

// Save watch
export const watchSave = (req, res) => {
    console.log(req.file)
    const watch = new Watch({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        picturePath: req.file.filename,
        hidden: Boolean(req.body.hidden)
    })
    watch.save((err) => {
        res.redirect('/')
    })
}

// Update watch
export const watchUpdate = (req, res) => {
    const id = req.body.id

    Watch.findById(id, (err, watch) => {
        watch.brand = req.body.brand
        watch.model = req.body.model
        watch.year = req.body.year
        watch.color = req.body.color
        watch.description = req.body.description
        watch.price = req.body.price
        watch.picturePath = req.body.picturePath
        watch.hidden = Boolean(req.body.hidden)
        watch.save((err) => {
            res.redirect('/')
        })
    })
}

// Delete watch
export const watchDelete = (req, res) => {
    const id = req.params.id

    Watch.findById(id, (err, watch) => {
        watch.remove((err) => {
            res.redirect('/')
        })
    })
}