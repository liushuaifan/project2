// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/error');

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
