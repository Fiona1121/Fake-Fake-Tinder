
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const mongoose = require('mongoose')


import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const ImageSchema = new Schema({
	buffer:{
		type: String,
	}
})

// Creating a table within database with the defined schema
const Image = mongoose.model('image', ImageSchema)

// Exporting table for querying and mutating
//module.exports = Image
export default Image