const express = require('express');
const router = express.Router();
const SavedQuery = require('../models/SavedQuery');

// GET saved queries for a user
router.get('/:email', async (req, res) => {
  try {
    const queries = await SavedQuery.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching queries" });
  }
});



module.exports = router;
