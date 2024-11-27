"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Appointment } from "@/types/appwrite.type";
import AppointmentForm from "../forms/AppointmentForm";

type AppointmentsModalProps = {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
  title: string;
  description: string;
};

const AppointmentModal = ({ type, patientId, userId, appointment, title, description }: AppointmentsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`capitalize ${type === "schedule" && "text-green-500"}`}>
          {type}
        </Button>
      </DialogTrigger>

      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="space-y-5">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>Please fill in the following details to {type} an appointment</DialogDescription>
        </DialogHeader>

        {/* Form */}
        <AppointmentForm userId={userId} patientId={patientId} type={type} appointment={appointment} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
