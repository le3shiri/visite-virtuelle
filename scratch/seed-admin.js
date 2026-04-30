const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAdmin() {
  const account = 'admin';
  const password = 'admin123';
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  console.log('Seeding admin user...');
  
  const { data, error } = await supabase
    .from('account_user')
    .upsert({
      account: account,
      password: hashedPassword,
      role: 'ADMIN',
      is_active: true
    }, { onConflict: 'account' })
    .select();

  if (error) {
    console.error('Error seeding admin:', error);
  } else {
    console.log('Admin user seeded successfully!');
    console.log('Account: admin');
    console.log('Password: admin123');
  }
}

seedAdmin();
