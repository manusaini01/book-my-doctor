// src/app/api/hospitals/[hospitalId]/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// PostgreSQL client setup
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// export async function DELETE(req: Request, { params }: { params: { hospitalId: string } }) {
//   const { hospitalId } = params;
export async function DELETE(req: Request) {

  const { user_id } = await req.json();

  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Delete the hospital
    await client.query('DELETE FROM users WHERE id = $1', [user_id]);

    // Commit transaction
    await client.query('COMMIT');

    return NextResponse.json({ message: 'Hospital deleted successfully' }, { status: 200 });
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Error deleting hospital:', error);
    return NextResponse.json({ error: 'Failed to delete hospital' }, { status: 500 });
  } finally {
    client.release();
  }
}
