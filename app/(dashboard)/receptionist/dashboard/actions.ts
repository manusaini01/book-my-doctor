'use server';
import { ApiResponse, SelectDoctor, SelectReceptionist } from "@/lib/utils/types";
import { cookies } from "next/headers";

export async function fetchReceptionistById(): Promise<ApiResponse> {
  try {
    const cookieStore = cookies()
    const email = cookieStore.get('email')?.value
    const user_id = cookieStore.get('user_id')?.value
    const quary = `email=${email}&user_id=${user_id}`
    const response = await fetch(`${process.env.BASE_URL}/api/receptionist/get_receptionist_by_id?${quary}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const result: ApiResponse<SelectReceptionist> = await response.json();
      return result;
    } else {
      const error: ApiResponse = await response.json();
      console.error('Failed to fetch receptionist:', error.error);
      return error;
    }
  } catch (error) {
    console.error('Error:', error);
    return { error: 'An unexpected error occurred' }; // Provide a default error message
  }
}


export async function fetchDoctorsByAssignment(hospital_id: string, receptionist_id: string): Promise<ApiResponse<SelectDoctor[]>> {
  try {

    // Construct query string with receptionist_id and hospital_id
    const query = `receptionist_id=${receptionist_id}&hospital_id=${hospital_id}`;

    const response = await fetch(`${process.env.BASE_URL}/api/assigning_doctors/get?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // If successful, parse and return the doctors' data
      const result: ApiResponse<SelectDoctor[]> = await response.json();
      return result;
    } else {
      // If there's an error, capture the error details
      const error: ApiResponse = await response.json();
      console.error('Failed to fetch doctors:', error.error);
      return error;
    }
  } catch (error) {
    console.error('Error:', error);
    return { error: 'An unexpected error occurred' }; // Provide a default error message
  }
}