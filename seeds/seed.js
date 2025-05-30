const db = require('../db/connection');
const format = require('pg-format');
const { createRef, formatSearchHistory } = require('./utils');

// Example seed data (replace with your own or import from a test-data.js file)
const locationData = [
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Manchester', lat: 53.4808, lon: -2.2426 }
];
const preferencesData = [
  { user_id: 1, units: 'metric', theme: 'light', language: 'en' }
];
const searchHistoryData = [
  { city: 'London', searched_at: new Date(), user_id: 1 },
  { city: 'Manchester', searched_at: new Date(), user_id: 1 }
];

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS search_history;`)
    .then(() => db.query(`DROP TABLE IF EXISTS preferences;`))
    .then(() => db.query(`DROP TABLE IF EXISTS locations;`))
    .then(() => {
      return db.query(`
        CREATE TABLE locations (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          lat FLOAT NOT NULL,
          lon FLOAT NOT NULL
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE preferences (
          user_id INT PRIMARY KEY,
          units TEXT,
          theme TEXT,
          language TEXT
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE search_history (
          id SERIAL PRIMARY KEY,
          user_id INT,
          city TEXT,
          searched_at TIMESTAMP DEFAULT NOW()
        );
      `);
    })
    .then(() => {
      const insertLocations = format(
        'INSERT INTO locations (name, lat, lon) VALUES %L RETURNING *;',
        locationData.map(({ name, lat, lon }) => [name, lat, lon])
      );
      return db.query(insertLocations);
    })
    .then(() => {
      const insertPreferences = format(
        'INSERT INTO preferences (user_id, units, theme, language) VALUES %L RETURNING *;',
        preferencesData.map(({ user_id, units, theme, language }) => [user_id, units, theme, language])
      );
      return db.query(insertPreferences);
    })
    .then(() => {
      const insertSearchHistory = format(
        'INSERT INTO search_history (user_id, city, searched_at) VALUES %L RETURNING *;',
        searchHistoryData.map(({ user_id, city, searched_at }) => [user_id, city, searched_at])
      );
      return db.query(insertSearchHistory);
    });
};

module.exports = seed;
