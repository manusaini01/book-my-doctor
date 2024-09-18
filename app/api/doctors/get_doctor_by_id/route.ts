// api/doctors/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(req: Request) {
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

    // Fetch doctor data based on email and user_id
    const doctorsQuery = `
      SELECT 
        doctors.doctor_id,
        doctors.hospital_id,
        doctors.name,
        doctors.specialization,
        doctors.qualifications,
        doctors.contact_info,
        doctors.created_at,
        doctors.updated_at,
        doctors.email,
        doctors.image_url,
        users.username,
        users.email AS user_email
      FROM 
        doctors
      JOIN 
        users ON doctors.user_id = users.id
      WHERE 
        doctors.email = $1 AND users.id = $2;
    `;
    const doctorsResult = await client.query(doctorsQuery, [email, user_id]);

    // Commit transaction
    await client.query('COMMIT');

    // Check if no doctor was found
    if (doctorsResult.rows.length === 0) {
      return NextResponse.json({ error: 'No doctor found with the provided email and user ID' }, { status: 404 });
    }

    return NextResponse.json(doctorsResult.rows[0], { status: 200 });
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Failed to fetch doctor' }, { status: 500 });
  } finally {
    client.release();
  }
}
