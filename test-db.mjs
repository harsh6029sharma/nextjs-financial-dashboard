import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import postgres from 'postgres';
import 'dotenv/config';

console.log('Connecting to:', process.env.POSTGRES_URL?.split('@')[1]);

const sql = postgres(process.env.POSTGRES_URL, {
  ssl: 'require',
  connect_timeout: 15,
});

try {
  const result = await sql`SELECT NOW()`;
  console.log('SUCCESS:', result);
} catch (err) {
  console.error('FAILED:', err);
} finally {
  await sql.end();
}