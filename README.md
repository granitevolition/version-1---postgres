# Postgres Database for User Registration

This repository contains the database schema and setup files for the user registration system.

## Setup with Railway

1. Create a new Postgres database in Railway
2. Connect to the database using the connection details provided by Railway
3. Run the schema.sql file to set up the required tables

## Connection Details

When setting up the backend application, you'll need to use the connection details provided by Railway:

```
POSTGRES_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

Make sure to add these as environment variables in your backend service.

## Database Schema

The database contains a `users` table with the following structure:

- `id`: Primary key
- `username`: Unique username (required)
- `password_hash`: Hashed password (required)
- `created_at`: Timestamp of when the user was created
- `updated_at`: Timestamp of when the user was last updated
