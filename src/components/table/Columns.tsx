"use client";

import { ColumnDef } from "@tanstack/react-table";

import StatusBadge from "./StatusBadge";
import { Appointment } from "@/types/appwrite.type";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "./AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <p>{formatDateTime(row.original.schedule).dateTime}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find((doctor) => doctor.name === row.original.primaryPhysician);
      return (
        <div className="flex items-center gap-3">
          <Image src={doctor?.image} alt={doctor?.name} width={100} height={100} className="size-8" />
          <p className="whitespace-nowrap">dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "Actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => (
      <div className="flex gap-1">
        <AppointmentModal type="schedule" patientId={data.patient.$id} userId={data.userId} appointment={data} title="Schedule Appointment" description="Please confirm the following details to scheduled" />

        <AppointmentModal type="cancel" patientId={data.patient.$id} userId={data.userId} appointment={data} title="Calcel Appointment" description="Are you sure you want to cancel your appointment" />
      </div>
    ),
  },
];
