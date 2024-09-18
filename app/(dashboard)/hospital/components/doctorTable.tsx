"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectDoctor } from "@/lib/utils/types";


interface CheckboxWithActionProps {
  doctor: SelectDoctor[]; // Define the doctor prop as an array of SelectDoctor objects
}
const DoctorTable: React.FC<CheckboxWithActionProps> = ({ doctor }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedRows?.length === doctor?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(doctor.map((row) => row.doctor_id));
    }
  };

  const handleRowSelect = (id: string) => {
    const updatedSelectedRows = [...selectedRows];
    if (selectedRows.includes(id)) {
      updatedSelectedRows.splice(selectedRows.indexOf(id), 1);
    } else {
      updatedSelectedRows.push(id);
    }
    setSelectedRows(updatedSelectedRows);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              checked={selectedRows.length === doctor.length || "indeterminate"}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>

          <TableHead className=" font-semibold">
            {selectedRows.length === doctor.length ? (
              <div className=" flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className=" text-xs "
                  color="secondary"
                >
                  Bulk edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className=" text-xs "
                  color="destructive"
                >
                  Delete all
                </Button>
              </div>
            ) : (
              "User"
            )}
          </TableHead>
          {/* <TableHead>Name</TableHead> */}
          <TableHead>Email</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {doctor.map((item:SelectDoctor) => (
          <TableRow
            key={item.email}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item.doctor_id) && "selected"}
          >
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(item.doctor_id)}
                onCheckedChange={() => handleRowSelect(item.doctor_id)}
              />
            </TableCell>
            <TableCell className="  font-medium  text-card-foreground/80">
              <div className="flex gap-3 items-center">
                {/* <Avatar className=" rounded-full">
                  <AvatarImage src={item.image_url} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar> */}
                <span className=" text-sm   text-card-foreground">
                  {item.name}
                </span>
              </div>
            </TableCell>

            {/* <TableCell>{item.name}</TableCell> */}
            <TableCell>{item.email}</TableCell>
            <TableCell>
              {item.specialization}
            </TableCell>

            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7"
                >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:eye" className=" h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:trash" className=" h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DoctorTable;
