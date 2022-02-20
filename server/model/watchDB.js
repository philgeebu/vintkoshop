import mongoose from 'mongoose'
import dbUrl from './dbUrl.js'

let Schema = mongoose.Schema;

let watchSchema = new Schema({
	brand: String,
	model: String,
	year: Number,
	color: String,
	description: String,
	price: Number,
	picturePath: String,
	hidden: Boolean
}, {
	collection: 'watches',
	timestamps: true,
})

export default {
	getModel: () => {
		let connection = mongoose.createConnection(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		return connection.model("WatchModel", watchSchema)
	}
}