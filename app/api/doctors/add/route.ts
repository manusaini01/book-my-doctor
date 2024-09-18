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
    specialization,
    qualifications,
    contact_info,
    hospital_id,
    image_url
  } = await req.json();

  const client = await pool.connect();

  try {
    // Check if the email already exists in the users table
    const userCheckQuery = 'SELECT id FROM users WHERE email = $1';
    const userCheckResult = await client.query(userCheckQuery, [email]);

    if (userCheckResult.rows.length > 0) {
      throw new Error('Email already exists in users table');
    }

    // Check if the email already exists in the doctors table
    const doctorCheckQuery = 'SELECT doctor_id FROM doctors WHERE email = $1';
    const doctorCheckResult = await client.query(doctorCheckQuery, [email]);

    if (doctorCheckResult.rows.length > 0) {
      throw new Error('Email already exists in doctors table');
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
        VALUES ((SELECT id FROM roles WHERE name = 'doctor'), $1, $2, $3)
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

    let doctorId: string;

    try {
      // Insert doctor into the doctors table
      const doctorInsertQuery = `
        INSERT INTO doctors (
          doctor_id, hospital_id, name, specialization, qualifications, contact_info, created_at, updated_at, email, image_url, user_id
        )
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW(), $6, $7, $8)
        RETURNING doctor_id;
      `;
      const doctorResult = await client.query(doctorInsertQuery, [
        hospital_id, name, specialization, qualifications, contact_info, email, image_url, userId
      ]);
      doctorId = doctorResult.rows[0].doctor_id;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to insert doctor into doctors table: ${error.message}`);
      }
      throw error;
    }

    // Commit transaction
    await client.query('COMMIT');

    return NextResponse.json({ message: 'Doctor and user added successfully', doctorId, userId }, { status: 201 });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding doctor and user:', error);

    if (error instanceof Error) {
      // Differentiating errors based on the content of the error message
      if (error.message.includes('already exists')) {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }
    }

    return NextResponse.json({ error: 'Failed to add doctor and user' }, { status: 500 });
  } finally {
    client.release();
  }
}
