/**
 * This script tests the connection to the Railway Postgres database
 * Usage: node test-connection.js
 */

const { Client } = require('pg');

async function testDatabaseConnection() {
  // Try different connection variables in this order
  const connectionString = process.env.DATABASE_URL || 
                           process.env.DATABASE_PUBLIC_URL || 
                           process.env.POSTGRES_URL;
  
  if (!connectionString) {
    console.error('Error: No database connection string found');
    console.error('Please set DATABASE_URL, DATABASE_PUBLIC_URL, or POSTGRES_URL');
    process.exit(1);
  }

  console.log('Connecting to database...');
  
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Railway Postgres
    }
  });

  try {
    // Connect to the database
    await client.connect();
    console.log('✅ Successfully connected to the database');

    // Test query
    const res = await client.query('SELECT NOW() as time, current_database() as database');
    console.log(`Server time: ${res.rows[0].time}`);
    console.log(`Database name: ${res.rows[0].database}`);
    
    // Check if users table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Users table exists');
      
      // Count users
      const userCount = await client.query('SELECT COUNT(*) FROM users');
      console.log(`Total users: ${userCount.rows[0].count}`);
    } else {
      console.log('❌ Users table does not exist');
      console.log('Run the schema.sql file to create the required tables');
    }

  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error(err);
  } finally {
    // Close the connection
    await client.end();
    console.log('Database connection closed');
  }
}

testDatabaseConnection();
