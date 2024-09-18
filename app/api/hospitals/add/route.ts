// api/hospitals/add/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function POST(req: Request) {
  const {
    name,
    email,
    password,
    phone_number,
    description,
    city,
    state,
    logo
  } = await req.json();

  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the users table
    const userInsertQuery = `
      INSERT INTO users (role_id, email, username, password_hash)
      VALUES ((SELECT id FROM roles WHERE name = 'hospital'), $1, $2, $3)
      RETURNING id;
    `;
    const userResult = await client.query(userInsertQuery, [email, name, hashedPassword]);
    const userId = userResult.rows[0].id;

    // Insert hospital into the hospitals table
    const hospitalInsertQuery = `
      INSERT INTO hospitals (
        user_id, name, phone_number, description, city, state, email, logo
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING hospital_id;
    `;
    await client.query(hospitalInsertQuery, [
      userId, name, phone_number, description, city, state, email, logo
    ]);

    // Commit transaction
    await client.query('COMMIT');

    return NextResponse.json({ message: 'Hospital added successfully' }, { status: 201 });
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Error adding hospital:', error);
    return NextResponse.json({ error: 'Failed to add hospital' }, { status: 500 });
  } finally {
    client.release();
  }
}
