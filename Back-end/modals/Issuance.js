const mongoose = require('mongoose');

const issuanceSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    issueDate: { type: Date, default: Date.now },
    targetReturnDate: { type: Date, required: true },
    returned: { type: Boolean, default: false }
});

module.exports = mongoose.model('Issuance', issuanceSchema);
