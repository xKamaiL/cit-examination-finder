const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const _ = require('lodash');
const data = require('./examination.json');
app.use(cors({ origin: true }));
app.get('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.send(data);
});

exports.api = functions.https.onRequest(app);
