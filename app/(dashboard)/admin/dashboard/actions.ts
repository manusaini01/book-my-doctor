'use server';

import { ApiResponse, SelectHospital } from "@/lib/utils/types";


// Action function to fetch hospital data
export async function getHospitals(
  search: string,
  offset: number
): Promise<{
  hospitals: SelectHospital[];
  newOffset: number | null;
  totalHospitals: number;
}> {
  try {
    // Build the URL with query parameters
    const url = new URL(`/api/hospitals/get_all_hospitals`);
    // url.searchParams.append('search', search);
    // url.searchParams.append('offset', offset.toString());

    const response = await fetch(url.toString(), {
      method: 'GET', // Correct HTTP method
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need, such as authorization headers
      },
      cache: 'no-store', // Ensure the data is fetched fresh

    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error fetching hospitals: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      hospitals: data,
      newOffset: data.newOffset,
      totalHospitals: data.totalHospitals,
    };
  } catch (error) {
    console.error('Failed to fetch hospitals:', error);
    // Handle the error as needed, e.g., return default values or rethrow the error
    return {
      hospitals: [],
      newOffset: null,
      totalHospitals: 0,
    };
  }
}

// // types.ts (or any appropriate file for types)
// export interface ApiResponse {
//   message?: string;
//   error?: string;
// }

// api.ts
export async function deleteHospitalById(user_id: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`/api/hospitals/deleteHospital`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }), // Send the hospitalId in the request body
    });

    if (response.ok) {
      const result: ApiResponse = await response.json();
      console.log('Hospital deleted successfully:', result.message);
      return result;
    } else {
      const error: ApiResponse = await response.json();
      console.error('Failed to delete hospital:', error.error);
      return error;
    }
  } catch (error) {
    console.error('Error:', error);
    return { error: 'An unexpected error occurred' }; // Provide a default error message
  }
}
