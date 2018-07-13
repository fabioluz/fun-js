DROP INDEX ix_users_email;

CREATE UNIQUE INDEX ix_users_email ON users (email);