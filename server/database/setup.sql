DROP DATABASE IF EXISTS garager;
CREATE DATABASE garager;

\c garager;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY
);


DROP TABLE IF EXISTS items;
CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL DEFAULT NULL,
  title TEXT NOT NULL DEFAULT NULL,
  category TEXT NOT NULL DEFAULT NULL,
  brand TEXT NOT NULL DEFAULT NULL,
  model TEXT NOT NULL DEFAULT NULL,
  itemDescription TEXT NOT NULL DEFAULT NULL,
  price NUMERIC(12,2) NOT NULL DEFAULT NULL,
  nyop BOOLEAN NULL DEFAULT false,
  min_price NUMERIC(12,2) NULL DEFAULT NULL,
  availableFrom DATE NOT NULL DEFAULT NULL,
  availableTo DATE NOT NULL DEFAULT NULL,
  address1 TEXT NOT NULL DEFAULT NULL,
  latLng TEXT NOT NULL DEFAULT NULL,
  photos TEXT NOT NULL DEFAULT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

CREATE INDEX item_index ON items(user_id);
SELECT setval('items_item_id_seq', (SELECT MAX(item_id) FROM items));



-- Sample values

