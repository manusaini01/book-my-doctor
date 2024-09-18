// api/receptionists/route.ts
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

    // Fetch receptionist data based on email and user_id
    const receptionistsQuery = `
      SELECT 
        *
      FROM 
        receptionists
      JOIN 
        users ON receptionists.user_id = users.id
      WHERE 
        receptionists.email = $1 AND users.id = $2;
    `;
    const receptionistsResult = await client.query(receptionistsQuery, [email, user_id]);

    // Commit transaction
    await client.query('COMMIT');

    // Check if no receptionist was found
    if (receptionistsResult.rows.length === 0) {
      return NextResponse.json({ error: 'No receptionist found with the provided email and user ID' }, { status: 404 });
    }

    return NextResponse.json({data: receptionistsResult.rows[0]}, { status: 200 });
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Error fetching receptionist:', error);
    return NextResponse.json({ error: 'Failed to fetch receptionist' }, { status: 500 });
  } finally {
    client.release();
  }
}
