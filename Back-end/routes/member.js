const express = require('express');
const Member = require('../models/Member');
const router = express.Router();

// Get all members
router.get('/', async (req, res) => {
    const members = await Member.find();
    res.json(members);
});

// Add a new member
router.post('/', async (req, res) => {
    const newMember = new Member(req.body);
    await newMember.save();
    res.json(newMember);
});

// Get member by ID
router.get('/:id', async (req, res) => {
    const member = await Member.findById(req.params.id);
    res.json(member);
});

// Update member
router.put('/:id', async (req, res) => {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
});

module.exports = router;
