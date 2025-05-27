  CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    lat FLOAT NOT NULL,
    lon FLOAT NOT NULL
  );

  CREATE TABLE preferences (
    user_id INT PRIMARY KEY,
    units TEXT,
    theme TEXT,
    language TEXT
  );

  CREATE TABLE search_history (
    id SERIAL PRIMARY KEY,
    user_id INT,
    city TEXT,
    searched_at TIMESTAMP DEFAULT NOW()
  );