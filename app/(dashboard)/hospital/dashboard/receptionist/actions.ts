'use server';

import { ApiResponse, SelectDoctor, SelectHospital } from "@/lib/utils/types";
import { cookies } from "next/headers";



export async function fetchAllReceptionists(hospitalId: string) {
    const response = await fetch(`/api/receptionist/get_all_receptionist?hospital_id=${hospitalId}`);
    if (response.ok) {
      const data = await response.json();
      return data.receptionists;
    } else {
      console.error('Failed to fetch receptionists');
    }
}


// api.ts
export async function deleteReceptionistById(doctorId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`/api/doctors/delete_doctor`, {
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
  