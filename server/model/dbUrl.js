const credentials = {
	host: 'localhost:27017',
	username: 'vintko',
	password: 'vintko_secret',
	database: 'vintkoshop'
}

export default `mongodb://${credentials.username}:${credentials.password}@${credentials.host}/${credentials.database}`