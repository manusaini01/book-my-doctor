// src/app/api/doctors/get_all_doctors/route.ts
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
    // Query to fetch doctors from the doctors table only based on hospital_id
    const result = await client.query(
      `SELECT * 
       FROM doctors 
       WHERE hospital_id = $1
       ORDER BY name 
       LIMIT $2 OFFSET $3`,
      [hospital_id, limit, offset]
    );

    const totalDoctorsResult = await client.query(
      `SELECT COUNT(*) 
       FROM doctors 
       WHERE hospital_id = $1`,
      [hospital_id]
    );
    
    const totalDoctors = parseInt(totalDoctorsResult.rows[0].count, 10);

    return NextResponse.json({
      doctors: result.rows,
      newOffset: offset + limit,
      totalDoctors,
    });
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  } finally {
    client.release();
  }
}
