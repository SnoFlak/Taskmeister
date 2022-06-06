const express = require('express');
const router = express.Router();

const users = [
  {
    id: 1,
    name: 'FearTheDev',
    email: 'fearthedeveloper@gmail.com',
    password: 'developer',
  },
];

router.post('/add', (req, res) => {
  const { user } = req.body;

  if (!user.name) {
    res.status(400).send('Please provide a name.');
  }

  if (!user.email) {
    res.status(400).send('Please provide an email.');
  }

  if (!user.password) {
    res.status(400).send('Please provide a password.');
  }

  const userToAdd = users.filter((u) => u.name === user.name);

  if (userToAdd.length > 0) {
    res.status(400).send('User already exists.');
  }

  const newUserID = users.length + 1;
  user.id = newUserID;
  users.push(user);

  res.status(201).json({ message: 'User added successfully.', user });
});

module.exports = router;
