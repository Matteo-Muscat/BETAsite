import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const page = req.query.page || 'like';

    const rows = await sql`
      SELECT count
      FROM likes
      WHERE page_name = ${page}
      LIMIT 1
    `;

    const count = rows.length > 0 ? rows[0].count : 0;

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ count });
  } catch (error) {
    console.error('GET /api/likes error:', error);
    return res.status(500).json({ error: 'Failed to fetch likes' });
  }
}