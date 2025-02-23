const express = require('express');
const Issuance = require('../models/Issuance');
const Book = require('../models/Book');
const router = express.Router();

// Issue a book
router.post('/', async (req, res) => {
    const { memberId, bookId, targetReturnDate } = req.body;

    // Mark book as borrowed
    await Book.findByIdAndUpdate(bookId, { isBorrowed: true });

    const issuance = new Issuance({
        memberId,
        bookId,
        targetReturnDate
    });

    await issuance.save();
    res.json(issuance);
});

// Get pending returns
router.get('/pending', async (req, res) => {
    const today = new Date();
    const pending = await Issuance.find({ returned: false, targetReturnDate: { $lt: today } })
        .populate('memberId', 'name')
        .populate('bookId', 'title');
    res.json(pending);
});

module.exports = router;
