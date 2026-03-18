import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 'like' } = req.body || {};

    const rows = await sql`
      UPDATE likes
      SET count = count + 1
      WHERE page_name = ${page}
      RETURNING count
    `;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Counter not found' });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ count: rows[0].count });
  } catch (error) {
    console.error('POST /api/like error:', error);
    return res.status(500).json({ error: 'Failed to increment like' });
  }
}