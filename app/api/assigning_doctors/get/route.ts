import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const receptionist_id = searchParams.get('receptionist_id');
  const hospital_id = searchParams.get('hospital_id');

  const client = await pool.connect();

  try {
    // Step 1: Build query to fetch doctor IDs from assignments
    let assignmentQuery = `
      SELECT 
        dra.doctor_id
      FROM 
        doctor_receptionist_assignments dra
      WHERE 1=1
    `;

    const queryParams: any[] = [];
    let paramIndex = 1;

    // If filtering by receptionist ID
    if (receptionist_id) {
      assignmentQuery += ` AND dra.receptionist_id = $${paramIndex}`;
      queryParams.push(receptionist_id);
      paramIndex++;
    }

    // If filtering by hospital ID
    if (hospital_id) {
      assignmentQuery += ` AND dra.hospital_id = $${paramIndex}`;
      queryParams.push(hospital_id);
      paramIndex++;
    }

    // Execute the query to get doctor IDs
    const assignmentResult = await client.query(assignmentQuery, queryParams);

    // If no doctors found, return 404
    if (assignmentResult.rows.length === 0) {
      return NextResponse.json({ message: 'No doctor assignments found' }, { status: 404 });
    }

    // Step 2: Extract the doctor IDs from the result
    const doctorIds = assignmentResult.rows.map((row: { doctor_id: string }) => row.doctor_id);

    // Step 3: Fetch complete doctor data for those doctor IDs
    const doctorQuery = `
      SELECT 
        *
      FROM 
        doctors
      WHERE 
        doctor_id = ANY($1::uuid[])
    `;

    const doctorResult = await client.query(doctorQuery, [doctorIds]);

    // Return the filtered doctors with all their details
    return NextResponse.json({data: doctorResult.rows}, { status: 200 });

  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  } finally {
    client.release();
  }
}
