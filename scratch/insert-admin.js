const { Client } = require('pg');
const crypto = require('crypto');
require('dotenv').config({ path: '.env' });

async function createAdmin() {
  const password = 'admin';
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  
  // Use ssl: { rejectUnauthorized: false }
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // Check if account_user table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'account_user'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log('Table account_user does not exist. Creating it...');
      await client.query(`
        CREATE TABLE account_user (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          account VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'ADMIN',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Insert or update the admin user
    const res = await client.query(`
      INSERT INTO account_user (account, password, role, is_active, email, display_name)
      VALUES ($1, $2, 'ADMIN', true, 'admin@example.com', 'Administrator')
      ON CONFLICT (account) 
      DO UPDATE SET password = EXCLUDED.password
      RETURNING *;
    `, ['admin', hashedPassword]);
    
    console.log('Admin user created successfully:');
    console.log(res.rows[0]);
    console.log('You can now log in with:');
    console.log('Username: admin');
    console.log('Password: admin');
    
  } catch (err) {
    console.error('Database error:', err);
  } finally {
    await client.end();
  }
}

createAdmin();
