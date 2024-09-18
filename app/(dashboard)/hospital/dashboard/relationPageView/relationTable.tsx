"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardDropdown from "@/components/dashboard-dropdown";
import { useEffect, useState } from "react";
import { fetchHospitalById, getDoctors } from "../actions";
import { setData } from "lib/features/hospital/hospitalSlice";
import { usehospitalDispatch, usehospitalSelector } from "@/lib/features/hospital/hospitalHooks";
import Alert from "@/lib/utils/alert";
import { SelectDoctor, SelectReceptionist, SelectHospital } from "@/lib/utils/types";
import { fetchAllReceptionists } from "../receptionist/actions";
import { fetchDoctorsByAssignment } from "app/(dashboard)/receptionist/dashboard/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RelationDoctorTable from "../../components/relationDoctorTable";

const RelationTableView = () => {
  const [doctors, setDoctors] = useState<SelectDoctor[]>([]);
  const [receptionists, setReceptionists] = useState<SelectReceptionist[]>([]);
  const [selectedReceptionistId, setSelectedReceptionistId] = useState(String);
  const [hospitalId, setHospitalId] = useState<string>("");
  const [alert, setAlert] = useState<{ type: 'info' | 'success' | 'warning' | 'error' | 'loading'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = usehospitalDispatch();
  const hospital = usehospitalSelector(state => state.hospital.data);

  // Fetch hospital and receptionist data
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setAlert({ type: 'loading', message: 'Loading...' });
      try {
        // Fetch hospital data if not already available
        if (!hospital || !hospital[0]?.hospital_id) {
          const response = await fetchHospitalById();
          if (response && response.data) {
            const hospitalData: SelectHospital = response.data;
            dispatch(setData([hospitalData]));
            setHospitalId(hospitalData.hospital_id);
          }
        } else {
          setHospitalId(hospital[0].hospital_id);
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
        setAlert({ type: 'error', message: 'Failed to load hospital data' });
      } finally {
        setIsLoading(false);
        setTimeout(() => setAlert(null), 5000);
      }
    };

    fetchInitialData();
  }, [dispatch, hospital]);

  // Fetch doctors and receptionists based on hospitalId
  useEffect(() => {
    const fetchReceptionists = async () => {
      if (hospitalId) {
        try {
          // Fetch receptionists
          const receptionistResponse = await fetchAllReceptionists(hospitalId);
          setSelectedReceptionistId(receptionistResponse && receptionistResponse[0]?.receptionist_id)
          setReceptionists(receptionistResponse || []);
         
        } catch (error) {
          console.error("Error fetching doctors or receptionists:", error);
          setAlert({ type: 'error', message: 'Failed to load data' });
        }
      }
    };

    fetchReceptionists();
  }, [hospitalId]);

  useEffect(() => {
    const fetchReceptionists = async () => {
      if (hospitalId && receptionists) {
        try {
          // Fetch doctors
          const doctorResponse = await fetchDoctorsByAssignment(hospitalId, selectedReceptionistId);
          console.log(doctorResponse)
          setDoctors(doctorResponse?.data || []);
          if(doctorResponse.message === "No doctor assignments found"){
        setAlert({ type: 'warning', message: 'No doctor assignments found' });
        setTimeout(() => setAlert(null), 5000);
          }
        } catch (error) {
          console.error("Error fetching doctors or receptionists:", error);
          setAlert({ type: 'error', message: 'Failed to load data' });
        }
      }
    };

    fetchReceptionists();
  }, [selectedReceptionistId]);


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="text-2xl font-medium text-default-800">
          Receptionist-Doctor Assignment Dashboard
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader className="flex-row justify-between items-center gap-4 mb-0 border-none p-6 pb-4">
              <CardTitle>Receptionists</CardTitle>
              <DashboardDropdown />
            </CardHeader>
            <CardContent className="px-0 pt-0 h-[580px] pb-0">
              <ScrollArea className="h-full">
                <Table>
                  <TableHeader>
                    <TableRow>


                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      {/* <TableHead>Hospital</TableHead> */}
                      {/* <TableHead>Action</TableHead> */}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {receptionists.map((item: SelectReceptionist) => (
                      <TableRow
                        key={item.email}
                        className="hover:bg-muted"
                      >


                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* <RelationReceptionistTable receptionist={receptionists} /> */}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <CardHeader className="flex-row justify-between items-center gap-4 mb-0 border-none p-6 pb-4">
            <CardTitle>Assigned Doctors</CardTitle>
            <DashboardDropdown />
          </CardHeader>
          <RelationDoctorTable doctor={doctors} />
        </div>
      </div>
    </div>
  );
};

export default RelationTableView;
