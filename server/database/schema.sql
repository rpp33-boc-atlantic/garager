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
    REFERENCES users(users_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_renter
    FOREIGN KEY(renter_id)
    REFERENCES users(users_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_item
    FOREIGN KEY(item_id)
    REFERENCES items(item_id)
    ON DELETE CASCADE
);

CREATE INDEX item_index ON transactions(item_id);
CREATE INDEX owner_index ON transactions(owner_id);
CREATE INDEX renter_index ON transactions(renter_id);