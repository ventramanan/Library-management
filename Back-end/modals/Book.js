const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    publishedYear: { type: Number, required: true },
    isBorrowed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookSchema);
