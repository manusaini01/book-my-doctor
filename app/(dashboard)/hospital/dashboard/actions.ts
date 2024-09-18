'use server';

import { ApiResponse, SelectDoctor, SelectHospital } from "@/lib/utils/types";
import { cookies } from "next/headers";



// Action function to fetch doctor data by hospital_id

export async function getDoctors(
  hospitalId: string,
  search: string = "",
  offset: number
): Promise<{
  doctors: SelectDoctor[];
  newOffset: number | null;
  totalDoctors: number;
}> {
  try {
    // Build the URL with query parameters
    const url = new URL(`${process.env.BASE_URL}/api/doctors/get_all_doctors`);
    url.searchParams.append('hospital_id', hospitalId);
    url.searchParams.append('search', search);
    url.searchParams.append('offset', offset.toString());

    const response = await fetch(url.toString(), {
      method: 'GET', // Correct HTTP method
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure the data is fetched fresh
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching doctors: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      doctors: data.doctors, // Only doctors associated with the hospital_id
      newOffset: data.newOffset,
      totalDoctors: data.totalDoctors,
    };
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return {
      doctors: [],
      newOffset: null,
      totalDoctors: 0,
    };
  }
}


// api.ts
export async function deleteDoctorById(doctorId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/doctors/delete_doctor`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId }), // Send the doctorId in the request body
      });
  
      if (response.ok) {
        const result: ApiResponse = await response.json();
        console.log('Doctor deleted successfully:', result.message);
        return result;
      } else {
        const error: ApiResponse = await response.json();
        console.error('Failed to delete doctor:', error.error);
        return error;
      }
    } catch (error) {
      console.error('Error:', error);
      return { error: 'An unexpected error occurred' }; // Provide a default error message
    }
  }
  
// api.ts (client-side)

export async function fetchHospitalById(): Promise<ApiResponse> {
  try {
  const cookieStore = cookies()
  const email = cookieStore.get('email')?.value
  const user_id = cookieStore.get('user_id')?.value
  const quary = `email=${email}&user_id=${user_id}`
    const response = await fetch(`${process.env.BASE_URL}/api/hospitals/get_hospital?${quary}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const result: ApiResponse<SelectHospital> = await response.json();
      return result;
    } else {
      const error: ApiResponse = await response.json();
      console.error('Failed to fetch hospital:', error.error);
      return error;
    }
  } catch (error) {
    console.error('Error:', error);
    return { error: 'An unexpected error occurred' }; // Provide a default error message
  }
}