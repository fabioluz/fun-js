CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  fullname VARCHAR NOT NULL
);

CREATE INDEX ix_users_email ON users (email);