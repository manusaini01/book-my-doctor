"use server";

// Define the type for the doctor form data
export interface DoctorFormData {
  name: string;
  email: string;
  password: string;
  hospital_id: string;
  specialization?: string; // Optional field
  qualifications?: string; // Optional field
  contact_info?: Record<string, any>; // Optional field
  image_url?: string; // Optional field
}

export async function add_doctor(formData: DoctorFormData) {
  try {

    // Ensure all required attributes are present
    if (!formData.hospital_id) {
      throw new Error('Invalid or missing hospital_id');
    }
    const response = await fetch(`/api/doctors/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to add doctor');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}
