const express = require('express');
const router = express.Router();

const calendar = require('../calendar');

router.get('/get', (req, res) => {
  res.status(200).json(calendar);
});

router.post('/add', (req, res) => {
  const { event } = req.body;

  if (!event.title) {
    res.status(400).send('Please provide a title.');
  }

  if (!event.date) {
    res.status(400).send('Please provide a date.');
  }

  if (!event.description) {
    res.status(400).send('Please provide a description.');
  }

  res.status(201).json({ message: 'Event added successfully.' });
});

module.exports = router;
