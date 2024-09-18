// src/app/api/doctors/[doctorId]/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// PostgreSQL client setup
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function DELETE(req: Request) {
  // Extract doctorId from the request body
  const { doctorId } = await req.json();

  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Delete the doctor from the doctors table
    await client.query('DELETE FROM doctors WHERE doctor_id = $1', [doctorId]);

    // Commit transaction
    await client.query('COMMIT');

    return NextResponse.json({ message: 'Doctor deleted successfully' }, { status: 200 });
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Error deleting doctor:', error);
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  } finally {
    client.release();
  }
}
