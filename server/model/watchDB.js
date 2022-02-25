import mongoose from 'mongoose'
import dbUrl from './dbUrl.js'

const Schema = mongoose.Schema

const watchSchema = new Schema({
	brand: String,
	model: String,
	year: Number,
	color: String,
	description: String,
	price: Number,
	picturePath: String
}, {
	collection: 'watches',
	timestamps: true,
})

export default {
	getModel: () => {
		const connection = mongoose.createConnection(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		return connection.model("WatchModel", watchSchema)
	}
}