// src/app/api/receptionists/get_all_receptionists/route.ts
// http://localhost:3000/api/receptionist/get_all_receptionist?hospital_id=7c51ae06-2646-4a41-89c4-d2751810c48d
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 5;
  const hospital_id = searchParams.get('hospital_id'); // Get hospital_id from query parameters

  if (!hospital_id) {
    return NextResponse.json({ error: 'hospital_id is required' }, { status: 400 });
  }
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM receptionists WHERE hospital_id = $1 ORDER BY name LIMIT $2 OFFSET $3',
      [hospital_id, limit, offset]
    );

    const totalReceptionistsResult = await client.query(
      'SELECT COUNT(*) FROM receptionists WHERE hospital_id = $1',
      [hospital_id]
    );
        const totalreceptionists = parseInt(totalReceptionistsResult.rows[0].count, 10);

    return NextResponse.json({
      receptionists: result.rows,
      newOffset: offset + limit,
      totalreceptionists,
    });
  } catch (error) {
    console.error('Failed to fetch receptionists:', error);
    return NextResponse.json({ error: 'Failed to fetch receptionists' }, { status: 500 });
  } finally {
    client.release();
  }
}
