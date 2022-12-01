const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folders = new Schema({
    file_name: {
        type: String,
        // required: true
    },
    img: {
        type: String,
        // required: true
    }
}, { versionKey: false })

module.exports = mongoose.model('files', folders)