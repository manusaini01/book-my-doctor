// pages/api/doctors/availability.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function POST(req: NextRequest) {
    const { doctorId, availableDays, availableHours } = await req.json();

    const query = `
        INSERT INTO availabilities (doctor_id, available_days, available_hours, created_at, updated_at)
        VALUES ($1, $2::jsonb, $3::jsonb, NOW(), NOW())
        ON CONFLICT (doctor_id)
        DO UPDATE SET
            available_days = EXCLUDED.available_days,
            available_hours = EXCLUDED.available_hours,
            updated_at = NOW()
        RETURNING *;
    `;

    const values = [doctorId, JSON.stringify(availableDays), JSON.stringify(availableHours)];

    try {
        const result = await pool.query(query, values);
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating availability:', error);
        return NextResponse.json({ error: 'Unable to update doctor availability.' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    // PUT method is treated similarly to POST in this example
    return POST(req);
}
