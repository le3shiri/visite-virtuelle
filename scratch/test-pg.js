const { Client } = require('pg');

async function testPooler(region, user, dbname) {
  const password = 'Aymanuhuh0707'; // from .env
  const host = `aws-0-${region}.pooler.supabase.com`;
  const port = 5432;
  
  const connectionString = `postgresql://${user}:${password}@${host}:${port}/${dbname}`;
  
  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log(`[SUCCESS] Region: ${region}, User: ${user}`);
    await client.end();
    return true;
  } catch (err) {
    console.log(`[FAIL] Region: ${region}, User: ${user} - ${err.message}`);
    return false;
  }
}

async function run() {
  const regions = [
    'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3',
    'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2'
  ];
  const projectRef = 'mnhictuyynkhaigegjbh';
  
  const usersToTest = [
    `postgres.${projectRef}`,
    `postgres`,
    `${projectRef}`
  ];

  for (const region of regions) {
    for (const user of usersToTest) {
      await testPooler(region, user, 'postgres');
    }
  }
}

run();
