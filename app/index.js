require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const router = require('../config/routes');
const errorHandler = require('./middlewares/errorHandler');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
