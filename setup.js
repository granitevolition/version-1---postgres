/**
 * This script demonstrates how to set up the Postgres database using Node.js
 * You can run this script to initialize your database schema
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  // Railway provides a connection string as an environment variable
  const connectionString = process.env.POSTGRES_URL;
  
  if (!connectionString) {
    console.error('Error: POSTGRES_URL environment variable not set');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
  });

  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to database');

    // Read the schema file
    const schemaFile = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaFile, 'utf8');

    // Execute the schema file
    await client.query(schema);
    console.log('Database schema created successfully');

  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    // Close the connection
    await client.end();
    console.log('Database connection closed');
  }
}

setupDatabase();
