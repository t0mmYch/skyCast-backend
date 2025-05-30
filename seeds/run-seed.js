const seed = require('./seed');
const db = require('../db/connection');
const devData= require("../db/data/development-data/index");

seed()
  .then(() => {
    console.log('Seeding complete!');
    return db.end();
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    db.end();
  }); 