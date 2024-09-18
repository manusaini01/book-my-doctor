// api/hospitals/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Extract search parameters
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const user_id = searchParams.get('user_id');

  // Check if both parameters are provided
  if (!email || !user_id) {
    return NextResponse.json({ error: 'Email and user_id are required' }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Fetch hospital data based on email and user_id
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
        users ON hospitals.user_id = users.id
      WHERE 
        hospitals.email = $1 AND users.id = $2;
    `;
    const hospitalsResult = await client.query(hospitalsQuery, [email, user_id]);

    // Commit transaction
    await client.query('COMMIT');

    // Check if no hospital was found
    if (hospitalsResult.rows.length === 0) {
      return NextResponse.json({ error: 'No hospital found with the provided email and user ID' }, { status: 404 });
    }
    const response =  NextResponse.json({data: hospitalsResult.rows[0]}, { status: 200 }); 
    return response;
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Error fetching hospital:', error);
    return NextResponse.json({ error: 'Failed to fetch hospital' }, { status: 500 });
  } finally {
    client.release();
  }
}
