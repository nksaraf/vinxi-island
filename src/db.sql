
CREATE TABLE IF NOT EXISTS captures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT,
  title TEXT,
  datetime TEXT
);

CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT,
  title TEXT,
  datetime TEXT
);

INSERT INTO captures (url, title, datetime) VALUES (
  "https://google.com",
  "Google",
  "2021-01-01",
)