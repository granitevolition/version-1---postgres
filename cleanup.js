/**
 * This script runs the cleanup SQL file to remove any humanizer-related tables
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function cleanupDatabase() {
  // Railway provides connection strings as environment variables
  const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;
  
  if (!connectionString) {
    console.error('Error: No database connection string found. Please check DATABASE_URL or DATABASE_PUBLIC_URL environment variables');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Railway Postgres
    }
  });

  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to database for cleanup');

    // Read the cleanup SQL file
    const cleanupFile = path.join(__dirname, 'cleanup-humanizer-tables.sql');
    const cleanupSql = fs.readFileSync(cleanupFile, 'utf8');

    // Execute the cleanup SQL
    await client.query(cleanupSql);
    console.log('Humanizer tables cleanup completed successfully');

    // List remaining tables for verification
    const { rows } = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('Remaining tables in the database:');
    rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });

  } catch (err) {
    console.error('Error cleaning up database:', err);
  } finally {
    // Close the connection
    await client.end();
    console.log('Database connection closed');
  }
}

// Run the cleanup
cleanupDatabase();
