'use client'
import { usereceptionistDispatch, usereceptionistSelector } from '@/lib/features/receptionist/receptionistHooks';
import { SelectReceptionist } from '@/lib/utils/types';
import React, { useEffect } from 'react';
import { fetchReceptionistById } from '../actions';
import { setData } from '@/lib/features/receptionist/receptionistSlice';

const ReceptionistProfile = () => {
  const dispatch = usereceptionistDispatch(); // Initialize the dispatch
  const receptionist = usereceptionistSelector(state => state.receptionist.data);
  
  useEffect(() => {
    async function GetReceptionist() {
      try {
        // Existing logic to handle receptionist ID
          const response = await fetchReceptionistById();
          if (response && response.data) {
            const receptionistData: SelectReceptionist = response.data;
            if (receptionistData) {
              dispatch(setData([receptionistData]));
            } else {
              console.error('No receptionist data found in the API response');
              return;
            }
          } else {
            console.error('No receptionist data found in the API response');
            return;
          }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    if (!receptionist || !receptionist[0]?.receptionist_id) {
      GetReceptionist(); // Fetch the receptionist data if not already available
    }
  }, []); // Dependency on receptionist data to avoid multiple requests



  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center bg-gray-100 p-6">
          {/* <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            <img
              src={`https://via.placeholder.com/150?text=${receptionist[0].name.charAt(0)}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div> */}
          <div className="ml-6">
            {/* <h2 className="text-2xl font-semibold text-gray-800">{receptionist[0]}</h2> */}
            {/* <p className="text-gray-600">{receptionist[0].email}</p> */}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800">Receptionist Information</h3>
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Receptionist Name </p>
                <p className="text-gray-800">{receptionist[0]?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Receptionist Email</p>
                <p className="text-gray-800">{receptionist[0]?.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Hospital Name</p>
                <p className="text-gray-800">{receptionist[0]?.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact Information</p>
                <p className="text-gray-800">{receptionist[0]?.contact_info.phone_number}</p>
                <p className="text-gray-800">{receptionist[0]?.contact_info.alternative_number}</p>
              </div>
              <div>
                <p className="text-gray-600">Created At</p>
                <p className="text-gray-800">{new Date(receptionist[0]?.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Updated At</p>
                <p className="text-gray-800">{new Date(receptionist[0]?.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ReceptionistProfile;
