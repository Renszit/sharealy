DROP TABLE IF EXISTS shareify;

CREATE TABLE shareify(
      id SERIAL PRIMARY KEY,
      url VARCHAR,
      track VARCHAR,
      lyrics VARCHAR,
      artist VARCHAR,
      fonts VARCHAR,
      youtube VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO shareify (url,lyrics,artist,fonts) VALUES ($1,$2,$2);
