const db = require("../db/connection");

exports.getLocations = () => {
  return db
    .query("SELECT * FROM locations ORDER BY id;")
    .then(({ rows }) => rows);
};

exports.saveLocation = ({ name, lat, lon }) => {
  return db
    .query(
      "INSERT INTO locations (name, lat, lon) VALUES ($1, $2, $3) RETURNING *;",
      [name, lat, lon]
    )
    .then(({ rows }) => rows[0]);
};

exports.deleteLocation = (id) => {
  return db.query("DELETE FROM locations WHERE id = $1;", [id]);
};

exports.updateLocation = (id, name) => {
  return db
    .query("UPDATE locations SET name = $1 WHERE id = $2 RETURNING *;", [
      name,
      id,
    ])
    .then(({ rows }) => rows[0]);
};
