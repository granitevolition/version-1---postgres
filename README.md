# Postgres Database for User Registration

This repository contains the database schema and setup files for the user registration system.

## Setup with Railway

1. Create a new Postgres database in Railway
2. Connect to the database using the connection details provided by Railway
3. Run the schema.sql file to set up the required tables

## Connection Details

When setting up the backend application, you'll need to use the connection details provided by Railway. Railway provides these connection strings as environment variables:

```
DATABASE_URL=postgresql://postgres:password@postgres.railway.internal:5432/railway
DATABASE_PUBLIC_URL=postgresql://postgres:password@shortline-url:5432/railway
```

For the backend service, you should use these variables directly rather than creating a new POSTGRES_URL environment variable. The setup.js script now looks for these standard Railway variables.

## SSL Configuration

Railway Postgres requires SSL configuration. When connecting with Node.js, include the following SSL settings:

```javascript
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});
```

## Database Schema

The database contains a `users` table with the following structure:

- `id`: Primary key
- `username`: Unique username (required)
- `password_hash`: Hashed password (required)
- `created_at`: Timestamp of when the user was created
- `updated_at`: Timestamp of when the user was last updated

## Railway Default Configuration

Railway Postgres uses these default values:
- Port: 5432
- Database: railway
- Username: postgres
- Host: postgres.railway.internal (internal) or your assigned public URL
