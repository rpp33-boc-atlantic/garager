-- ***** SEE NOTES AT THE BOTTOM OF THIS FILE BEFORE RUNNING SCRIPT *****
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
  dateJoined DATE DEFAULT NULL,
  stripe_id TEXT DEFAULT NULL
);

DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL DEFAULT NULL,
  title TEXT NOT NULL DEFAULT NULL,
  category TEXT NOT NULL DEFAULT NULL,
  brand TEXT DEFAULT NULL,
  model TEXT DEFAULT NULL,
  itemDescription TEXT NOT NULL DEFAULT NULL,
  price NUMERIC(12,2) NOT NULL DEFAULT NULL,
  nyop BOOLEAN NULL DEFAULT false,
  min_price NUMERIC(12,2) NULL DEFAULT NULL,
  availableFrom DATE NOT NULL DEFAULT NULL,
  availableTo DATE NOT NULL DEFAULT NULL,
  address TEXT NOT NULL DEFAULT NULL,
  latLng TEXT NOT NULL DEFAULT NULL,
  photos TEXT[],
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
  paymentIntent_id TEXT DEFAULT NULL,
  refunded BOOLEAN DEFAULT false,
  payment_status TEXT DEFAULT NULL,
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
	"last_message_id" int,
	"time_updated" bigint,
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

-- COPY COMMANDS ***** MUST BE INSIDE DATABASE DIRECTORY *****
\copy users from 'users.csv' delimiter ',' csv header;
\copy items from 'items.csv' delimiter ',' csv header;
\copy transactions from 'transactions.csv' delimiter ',' csv header;


-- ALTER TABLE items
-- ALTER COLUMN latlng TYPE json;


-- IF YOU WANT TO GET A COPY OF THE CURRENT DATA BASE YOU CAN VISIT THIS PATH
-- http://localhost:3000/get-data?table=users
-- change the table param to users/items/messages/transactions ect  and the proper table will be downloaded at this location.
--client/src/data/dataFunctions/${table}.json   (the files do not download directly to our db folder to  prevent against anyone accidentally replacing them)
--after you get a json file, convert it to csv here
-- https://jsonformatter.org/#

--I'm not sure if these commands can be run in the main script but I used these to convert the latlng

  update items
        set latlng = case
            when item_id > 1 then replace(latlng, '|',',"lng":')
            else latlng
          end;
     update items
          set latlng = case
              when item_id >= 0 then replace(latlng, latlng,`{"lat":${latlng}}`)
                  else latlng
              end;

-- I know the above works but this way to convert photos might not work.  -its a little

   UPDATE items
 SET photos =  case
WHEN photos = null THEN "{}"
ELSE replace(photos,photos,'{' || photos || '}')
END;
