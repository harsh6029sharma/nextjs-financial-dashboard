import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import postgres from 'postgres';

export async function GET() {
  console.log('Using URL host:', process.env.POSTGRES_URL?.split('@')[1]);

  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: 'require',
    connect_timeout: 15,
  });

  try {
    const result = await sql`SELECT NOW()`;
    await sql.end();
    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}