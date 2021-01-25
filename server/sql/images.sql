DROP TABLE IF EXISTS shareify;

CREATE TABLE shareify(
      id SERIAL PRIMARY KEY,
      url VARCHAR,
      lyrics VARCHAR,
      artist VARCHAR,
      fonts VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO shareify (url,lyrics,artist,fonts) VALUES ($1,$2,$2);

