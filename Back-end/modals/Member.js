const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    membershipDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);
