require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.get('/', (req, res) => {
  res.send(`Server is running on port: ${port}`);
});

// API Routes
app.use('/api/v1/events', require('./routers/eventsRouter'));
app.use('/api/v1/users', require('./routers/usersRouter'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
