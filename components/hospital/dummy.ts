// Assume this structure is similar to SelectProduct in your db/types
export interface SelectHospital {
  id: number;
  name: string;
  type: string;
  dentists: number;
  experience: string; // Example: "9 - 27 years experience"
  location: string;
  consultationFee: number;
}

// Dummy data
 const dummyHospitals: SelectHospital[] = [
  {
    id: 1,
    name: "Life Care Dental and Implant Centre",
    type: "Dental",
    dentists: 2,
    experience: "9 - 27 years experience",
    location: "Manimajra",
    consultationFee: 500
  },
  {
    id: 2,
    name: "City Hospital",
    type: "General",
    dentists: 5,
    experience: "5 - 15 years experience",
    location: "Downtown",
    consultationFee: 300
  },
  {
    id: 3,
    name: "Green Valley Medical Center",
    type: "Specialty",
    dentists: 3,
    experience: "10 - 20 years experience",
    location: "Suburbia",
    consultationFee: 700
  },
  {
    id: 4,
    name: "Sunset Community Hospital",
    type: "General",
    dentists: 4,
    experience: "7 - 25 years experience",
    location: "Sunset Valley",
    consultationFee: 400
  },
  {
    id: 5,
    name: "Oceanview Clinic",
    type: "Specialty",
    dentists: 2,
    experience: "12 - 30 years experience",
    location: "Seaside",
    consultationFee: 600
  },
  {
    id: 6,
    name: "Evergreen Dental Care",
    type: "Dental",
    dentists: 3,
    experience: "8 - 18 years experience",
    location: "Greenwood",
    consultationFee: 450
  },
  {
    id: 7,
    name: "Grace Hospital",
    type: "General",
    dentists: 6,
    experience: "6 - 22 years experience",
    location: "Hilltop",
    consultationFee: 350
  },
  {
    id: 8,
    name: "Palm Tree Medical Center",
    type: "Specialty",
    dentists: 4,
    experience: "11 - 28 years experience",
    location: "Palm City",
    consultationFee: 550
  },
  {
    id: 9,
    name: "Silver Lake Dental Clinic",
    type: "Dental",
    dentists: 2,
    experience: "10 - 20 years experience",
    location: "Silver Lake",
    consultationFee: 480
  },
  {
    id: 10,
    name: "Mountainview Hospital",
    type: "General",
    dentists: 5,
    experience: "9 - 24 years experience",
    location: "Mountain Town",
    consultationFee: 380
  },
];

export const dummyDoctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialization: 'Cardiology',
    experience: 15,
    availability: 'MON TO SAT: 09:00 AM TO 01:00 PM & 04:00 PM TO 08:00 PM MON TO SAT: 09:00 AM TO 01:00 PM & 04:00 PM TO 08:00 PM',
    education: 'MBBS, MD',
    imageUrl: 'https://images.pexels.com/photos/6812452/pexels-photo-6812452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialization: 'Neurology',
    experience: 10,
    availability: 'MON TO FRI: 10:00 AM TO 02:00 PM & 05:00 PM TO 09:00 PM',
    education: 'MBBS, MD',
    imageUrl: 'https://images.pexels.com/photos/6812452/pexels-photo-6812452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Dr. Emily Johnson',
    specialization: 'Dermatology',
    experience: 8,
    availability: 'TUE TO SAT: 08:00 AM TO 12:00 PM & 02:00 PM TO 06:00 PM',
    education: 'MBBS, MD',
    imageUrl: 'https://images.pexels.com/photos/6812452/pexels-photo-6812452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    name: 'Dr. Michael Brown',
    specialization: 'Pediatrics',
    experience: 12,
    availability: 'MON TO SAT: 09:00 AM TO 01:00 PM & 03:00 PM TO 07:00 PM',
    education: 'MBBS, MD',
    imageUrl: 'https://images.pexels.com/photos/6812452/pexels-photo-6812452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    name: 'Dr. Lisa White',
    specialization: 'Gynecology',
    experience: 20,
    availability: 'MON TO FRI: 10:00 AM TO 02:00 PM & 04:00 PM TO 08:00 PM',
    education: 'MBBS, MD',
    imageUrl: 'https://images.pexels.com/photos/6812452/pexels-photo-6812452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  }
];



export default dummyHospitals