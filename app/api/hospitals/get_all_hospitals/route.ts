'use server'
// api/hospitals/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(req: Request) {
  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Fetch hospital data along with the user details
    const hospitalsQuery = `
      SELECT 
        hospitals.hospital_id,
        hospitals.user_id,
        hospitals.name,
        hospitals.phone_number,
        hospitals.description,
        hospitals.city,
        hospitals.state,
        hospitals.email,
        hospitals.logo,
        users.username,
        users.email AS user_email
      FROM 
        hospitals
      JOIN 
        users ON hospitals.user_id = users.id;
    `;
    const hospitalsResult = await client.query(hospitalsQuery);

    // Commit transaction
    await client.query('COMMIT');

    return NextResponse.json(hospitalsResult.rows, { status: 200 });
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Error fetching hospitals:', error);
    return NextResponse.json({ error: 'Failed to fetch hospitals' }, { status: 500 });
  } finally {
    client.release();
  }
}
