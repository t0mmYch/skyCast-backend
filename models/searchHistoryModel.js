const db = require("../db/connection");

exports.getSearchHistory = (userId) => {
  return db
    .query(
      "SELECT city, searched_at FROM search_history WHERE user_id = $1 ORDER BY searched_at DESC LIMIT 10;",
      [userId]
    )
    .then(({ rows }) => rows);
};

exports.logSearch = (userId, city) => {
  return db
    .query(
      "INSERT INTO search_history (user_id, city, searched_at) VALUES ($1, $2, NOW()) RETURNING *;",
      [userId, city]
    )
    .then(({ rows }) => rows[0]);
};

exports.clearSearchHistory = (userId) => {
  return db.query("DELETE FROM search_history WHERE user_id = $1;", [userId]);
};
