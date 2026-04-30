const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function test() {
  console.log('Testing Prisma connection...');
  try {
    // Try to count projects to see if connection works
    const count = await prisma.project.count();
    console.log('Connection successful!');
    console.log(`Found ${count} projects in the database.`);
  } catch (error) {
    console.error('Prisma connection error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
