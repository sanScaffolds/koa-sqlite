const knex = require("knex");
const config = require("../config");

const environment = config.env;
const knexConfig = require("../../knexfile")[environment];

const db = knex(knexConfig);

module.exports = db;