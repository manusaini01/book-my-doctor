"use server"
// actions.ts
import { redirect } from 'next/navigation';

// Define the type for the form data
export interface HospitalFormData {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  description?: string; // Optional field
  city?: string; // Optional field
  state?: string; // Optional field
  logo?: string; // Optional field
}

export async function add_hospital(formData: HospitalFormData) {
  

  try {
    const response = await fetch(`/api/hospitals/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
        return response.json();
    } else {
      console.error('Failed to add hospital');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}
