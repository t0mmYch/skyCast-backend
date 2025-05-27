const db = require("../db/connection");

exports.getPreferences = (userId) => {
  return db
    .query("SELECT * FROM preferences WHERE user_id = $1;", [userId])
    .then(({ rows }) => rows[0]);
};

exports.savePreferences = (userId, prefs) => {
  const { units, theme, language } = prefs;
  return db
    .query(
      `INSERT INTO preferences (user_id, units, theme, language)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id) DO UPDATE SET units = $2, theme = $3, language = $4
     RETURNING *;`,
      [userId, units, theme, language]
    )
    .then(({ rows }) => rows[0]);
};
