const express = require('express');
const router = express.Router();
const Knex = require('../data/dbConfig.js')




router.use(express.json());

module.exports = router;