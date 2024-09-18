"use server";

// Define the type for the Receptionist form data
export interface ReceptionistFormData {
    hospital_id: string; // UUID is represented as a string
    hospital_name: string; 
    contact_info: Record<string, any>; // JSONB type is represented as an object
    name: string; // Character varying is represented as a string
    email: string; // Text is represented as a string
    password: string; // Text is represented as a string
}

export async function add_receptionist(formData: ReceptionistFormData) {
  try {

    // Ensure all required attributes are present
    if (!formData.hospital_id) {
      throw new Error('Invalid or missing hospital_id');
    }
    if (!formData.hospital_name) {
      throw new Error('missing hospital_name');
    }
    const response = await fetch(`/api/receptionist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error('Failed to add Receptionist');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}
