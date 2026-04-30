const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function fixRLS() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // Disable RLS on account_user table
    console.log('Disabling RLS on account_user...');
    await client.query(`ALTER TABLE account_user DISABLE ROW LEVEL SECURITY;`);
    
    console.log('RLS disabled. Login should now work for anon requests.');
    
  } catch (err) {
    console.error('Database error:', err);
  } finally {
    await client.end();
  }
}

fixRLS();
