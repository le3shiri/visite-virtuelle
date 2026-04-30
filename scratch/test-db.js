const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing connection to:', supabaseUrl);
  
  const { data, error } = await supabase
    .from('account_user')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('Error fetching users:', error);
  } else {
    console.log('Found user record:', data[0]);
    if (data[0]) {
      console.log('Columns:', Object.keys(data[0]));
    } else {
      console.log('Table is empty, but connection works.');
    }
  }
}

test();
