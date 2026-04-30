const net = require('net');

const regions = [
  'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1',
  'sa-east-1', 'ca-central-1', 'me-south-1'
];

const projectRef = 'mnhictuyynkhaigegjbh';

async function testRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    
    socket.on('connect', () => {
      console.log(`Region ${region} is reachable.`);
      socket.destroy();
      resolve(true);
    });
    
    socket.on('error', () => resolve(false));
    socket.on('timeout', () => resolve(false));
    
    socket.connect(6543, host);
  });
}

async function run() {
  for (const region of regions) {
    console.log(`Testing ${region}...`);
    const ok = await testRegion(region);
    if (ok) {
      console.log(`Potential region found: ${region}`);
    }
  }
}

run();
