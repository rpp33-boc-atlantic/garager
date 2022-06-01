DROP DATABASE IF EXISTS garager;
CREATE DATABASE garager;

\c garager;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  userPhoto CHARACTER VARYING(10485760) DEFAULT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  address VARCHAR(1000) DEFAULT NULL,
  dateJoined DATE DEFAULT NULL
)

DROP TABLE IF EXISTS items CASCADE;
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
  address TEXT NOT NULL DEFAULT NULL,
  latLng TEXT NOT NULL DEFAULT NULL,
  photos TEXT NOT NULL DEFAULT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE
);

CREATE INDEX user_index ON items(user_id);
SELECT setval('items_item_id_seq', (SELECT MAX(item_id) FROM items));

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(
  transaction_id SERIAL PRIMARY KEY,
  rate INT NOT NULL DEFAULT NULL,
  pickUpDate DATE NOT NULL DEFAULT NULL,
  returnDate DATE NOT NULL DEFAULT NULL,
  owner_id INT,
  renter_id INT,
  item_id INT,
  CONSTRAINT fk_owner
    FOREIGN KEY(owner_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_renter
    FOREIGN KEY(renter_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_item
    FOREIGN KEY(item_id)
    REFERENCES items(item_id)
    ON DELETE CASCADE
);

CREATE INDEX item_index ON transactions(item_id);
CREATE INDEX owner_index ON transactions(owner_id);
CREATE INDEX renter_index ON transactions(renter_id);

DROP TABLE IF EXISTS threads;
CREATE TABLE threads (
	"thread_id" serial NOT NULL,
	"item_id" int NOT NULL,
	"owner_id" int NOT NULL,
	"renter_id" int NOT NULL,
	"owner_viewed" BOOLEAN NOT NULL DEFAULT 'true',
	"renter_viewed" BOOLEAN NOT NULL DEFAULT 'true',
	"last_message_id" int DEFAULT 'null',
	"time_updated" bigint DEFAULT 'null'
	CONSTRAINT "threads_pk" PRIMARY KEY ("thread_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
	"message_id" serial NOT NULL,
	"thread_id" int NOT NULL,
	"user_id" int NOT NULL,
	"text" TEXT DEFAULT 'null',
	"image_url" TEXT DEFAULT 'null',
	"time_created" bigint NOT NULL,
	CONSTRAINT "messages_pk" PRIMARY KEY ("message_id")
) WITH (
  OIDS=FALSE
);

CREATE INDEX thread_owner_index ON threads(owner_id);
CREATE INDEX thread_renter_index ON threads(renter_id);
CREATE INDEX thread_id_index ON messages(thread_id);

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("thread_id") REFERENCES "threads"("thread_id");

-- Sample values
