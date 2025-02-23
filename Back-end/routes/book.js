const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Add a new book
router.post('/', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
});

// Get book by ID
router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
});

// Update book
router.put('/:id', async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
});

module.exports = router;
