// types.ts (or wherever you manage your types)
export interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  data?: T;  // This can now be any type, depending on what the API returns
}

  export interface SelectHospital {
    hospital_id: string;
    user_id: string;
    name: string;
    phone_number: string;
    description: string | null ;
    city: string;
    state: string;
    email: string;
    logo: string;
    username: string;
    user_email: string;
  }
  
  
export interface SelectDoctor {
  doctor_id: string;
  hospital_id: string;
  name: string;
  specialization: string | null;
  qualifications: string | null;
  contact_info: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  email: string;
  image_url: string | null;
  experience: string;
  user_email: string;
}


// Define the type for the doctor form data
export interface SelectReceptionist {
    receptionist_id: string; // UUID is represented as a string
    hospital_id: string; // UUID is represented as a string
    updated_at: Date; // Timestamp with time zone is represented as a Date object
    user_id: string; // UUID is represented as a string
    contact_info: Record<string, any>; // JSONB type is represented as an object
    created_at: Date; // Timestamp with time zone is represented as a Date object
    name: string; // Character varying is represented as a string
    email: string; // Text is represented as a string
    hospital_name: string; // Text is represented as a string
}