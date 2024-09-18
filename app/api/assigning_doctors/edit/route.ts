import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function PUT(req: Request) {
  const { doctor_id, receptionist_id, hospital_id, action } = await req.json();

  const client = await pool.connect();

  try {
    // Start transaction
    await client.query('BEGIN');

    // Check if the doctor exists in the specified hospital
    const doctorCheckQuery = 'SELECT doctor_id FROM doctors WHERE doctor_id = $1 AND hospital_id = $2';
    const doctorCheckResult = await client.query(doctorCheckQuery, [doctor_id, hospital_id]);

    if (doctorCheckResult.rows.length === 0) {
      throw new Error('Doctor not found in the specified hospital');
    }

    // Check if the receptionist exists in the specified hospital
    const receptionistCheckQuery = 'SELECT receptionist_id FROM receptionists WHERE receptionist_id = $1 AND hospital_id = $2';
    const receptionistCheckResult = await client.query(receptionistCheckQuery, [receptionist_id, hospital_id]);

    if (receptionistCheckResult.rows.length === 0) {
      throw new Error('Receptionist not found in the specified hospital');
    }

    // Handle the action: 'add', 'remove', or 'update'
    if (action === 'add') {
      // Check if the assignment already exists in the specified hospital
      const assignmentCheckQuery = `
        SELECT 1 FROM doctor_receptionist_assignments
        WHERE doctor_id = $1 AND receptionist_id = $2 AND hospital_id = $3
      `;
      const assignmentCheckResult = await client.query(assignmentCheckQuery, [doctor_id, receptionist_id, hospital_id]);

      if (assignmentCheckResult.rows.length > 0) {
        throw new Error('Assignment already exists');
      }

      // Add a new assignment in the specified hospital
      const addAssignmentQuery = `
        INSERT INTO doctor_receptionist_assignments (doctor_id, receptionist_id, hospital_id)
        VALUES ($1, $2, $3)
      `;
      await client.query(addAssignmentQuery, [doctor_id, receptionist_id, hospital_id]);

      // Commit transaction
      await client.query('COMMIT');

      return NextResponse.json({ message: 'Doctor assigned to receptionist successfully' }, { status: 200 });
    } 
    
    else if (action === 'remove') {
      // Remove the assignment from the specified hospital
      const removeAssignmentQuery = `
        DELETE FROM doctor_receptionist_assignments
        WHERE doctor_id = $1 AND receptionist_id = $2 AND hospital_id = $3
      `;
      await client.query(removeAssignmentQuery, [doctor_id, receptionist_id, hospital_id]);

      // Commit transaction
      await client.query('COMMIT');

      return NextResponse.json({ message: 'Doctor removed from receptionist successfully' }, { status: 200 });
    } 
    
    // else if (action === 'update') {
    //   const { new_doctor_id } = await req.json();

    //   // Check if the new doctor exists in the specified hospital
    //   const newDoctorCheckQuery = 'SELECT doctor_id FROM doctors WHERE doctor_id = $1 AND hospital_id = $2';
    //   const newDoctorCheckResult = await client.query(newDoctorCheckQuery, [new_doctor_id, hospital_id]);

    //   if (newDoctorCheckResult.rows.length === 0) {
    //     throw new Error('New doctor not found in the specified hospital');
    //   }

    //   // Update the assignment to change the doctor in the specified hospital
    //   const updateAssignmentQuery = `
    //     UPDATE doctor_receptionist_assignments
    //     SET doctor_id = $1
    //     WHERE doctor_id = $2 AND receptionist_id = $3 AND hospital_id = $4
    //   `;
    //   await client.query(updateAssignmentQuery, [new_doctor_id, doctor_id, receptionist_id, hospital_id]);

    //   // Commit transaction
    //   await client.query('COMMIT');

    //   return NextResponse.json({ message: 'Doctor assignment updated successfully' }, { status: 200 });
    // } 
    
    else {
      throw new Error('Invalid action');
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error managing doctor-receptionist assignment:', error);

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message.includes('already exists')) {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }
    }

    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  } finally {
    client.release();
  }
}
