"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Image from "next/image";
import { Doctors } from "@/constants";
import TextareaField from "../TextareaField";
import DatePicker from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAppointmentSchema } from "@/lib/validation";
import { z } from "zod";

const OppointmentForm = () => {
  const [primaryPhysician, setPrimaryPhysician] = useState<string>();

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleScheduleChange = (schedule: Date | null) => {
    setValue("schedule", schedule ?? new Date());
    setStartDate(schedule);
  };

  const handlePrimaryPhysicianChange = (primaryPhysician?: string) => {
    setValue("primaryPhysician", primaryPhysician ?? "");
    setPrimaryPhysician(primaryPhysician);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      schedule: new Date(),
    },
  });

  const handleSubmitOppointment: SubmitHandler<z.infer<typeof CreateAppointmentSchema>> = async (data: z.infer<typeof CreateAppointmentSchema>) => {
    console.log(data, "<---dihandleSubmitOppointment");
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitOppointment)} className="bg-rose-600 space-y-10">
      {/* Oppointment Field */}
      <section className="bg-lime-600 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative col-span-2">
          <Select value={primaryPhysician} onValueChange={handlePrimaryPhysicianChange}>
            <SelectTrigger>
              <SelectValue placeholder="Primary care physician" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Doctors.map((doctor, i) => (
                  <SelectItem key={i} value={doctor.name}>
                    <div className="flex items-center gap-2 bg-dark-300 border border-gray-700 p-1 rounded-lg">
                      <Image src={doctor.image} width={32} height={32} alt="doctor" className="rounded-full border border-dark-400" />
                      <span>{doctor.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors.primaryPhysician && primaryPhysician === undefined && <p className="absolute -bottom-5 text-red-500 text-sm">Care physician is {errors.primaryPhysician.message as string}</p>}
        </div>

        <div className="relative">
          <TextareaField id="reason" rows={5} cols={30} placeholder={`Reason for oppointment\nex: Annual montly check-up.`} propsData={{ ...register("reason") }} />

          {errors.reason && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.reason.message as string}</p>}
        </div>

        <div className="relative">
          <TextareaField id="note" rows={5} cols={30} placeholder={`Additional comments/notes\nex: Prefer afternoon oppointments, if possible.`} propsData={{ ...register("note") }} />

          {errors.note && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.note.message as string}</p>}
        </div>

        <div className="relative col-span-2">
          <DatePicker selected={startDate} onChange={handleScheduleChange} timeInputLabel="Time:" dateFormat="yyyy/MM/dd" showTimeInput wrapperClassName="date-picker" />

          <CiCalendar size={22} className="absolute left-3 top-3 text-green-500" />

          {errors.schedule && startDate === null && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.schedule.message as string}</p>}
        </div>
      </section>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? (
          <BiLoaderCircle size={22} className="animate-spin mx-auto" />
        ) : (
          <>
            <span>Submit and Continue</span>
            <BsSend size={18} />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default OppointmentForm;
