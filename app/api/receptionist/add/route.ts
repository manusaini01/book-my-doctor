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
    contact_info,
    hospital_id,
    hospital_name,
    // image_url
  } = await req.json();

  const client = await pool.connect();

  try {
    // Check if the email already exists in the users table
    const userCheckQuery = 'SELECT id FROM users WHERE email = $1';
    const userCheckResult = await client.query(userCheckQuery, [email]);

    if (userCheckResult.rows.length > 0) {
      throw new Error('Email already exists in users table');
    }

    // Check if the email already exists in the receptionists table
    const receptionistCheckQuery = 'SELECT receptionist_id FROM receptionists WHERE email = $1';
    const receptionistCheckResult = await client.query(receptionistCheckQuery, [email]);

    if (receptionistCheckResult.rows.length > 0) {
      throw new Error('Email already exists in receptionists table');
    }

    // Start transaction
    await client.query('BEGIN');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let userId: string;

    try {
      // Insert user into the users table
      const userInsertQuery = `
        INSERT INTO users (role_id, email, username, password_hash)
        VALUES ((SELECT id FROM roles WHERE name = 'receptionist'), $1, $2, $3)
        RETURNING id;
      `;
      const userResult = await client.query(userInsertQuery, [email, name, hashedPassword]);
      userId = userResult.rows[0].id;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to insert user into users table: ${error.message}`);
      }
      throw error;
    }

    let receptionistId: string;

    try {
      // Insert receptionist into the receptionists table
      const receptionistInsertQuery = `
        INSERT INTO receptionists (
          receptionist_id, hospital_id, name, contact_info, created_at, updated_at, email, user_id, hospital_name
        )
        VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW(), $4, $5, $6)
        RETURNING receptionist_id;
      `;
      const receptionistResult = await client.query(receptionistInsertQuery, [
        hospital_id, name, contact_info, email, userId, hospital_name
      ]);
      receptionistId = receptionistResult.rows[0].receptionist_id;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to insert receptionist into receptionists table: ${error.message}`);
      }
      throw error;
    }

    // Commit transaction
    await client.query('COMMIT');

    return NextResponse.json({ message: 'receptionist and user added successfully', receptionistId, userId }, { status: 201 });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding receptionist and user:', error);

    if (error instanceof Error) {
      // Differentiating errors based on the content of the error message
      if (error.message.includes('already exists')) {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }
    }

    return NextResponse.json({ error: 'Failed to add receptionist and user' }, { status: 500 });
  } finally {
    client.release();
  }
}
