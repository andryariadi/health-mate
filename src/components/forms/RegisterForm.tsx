"use client";

import { FaBarsStaggered } from "react-icons/fa6";
import InputField from "../InputField";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { PiBag } from "react-icons/pi";
import { TiContacts } from "react-icons/ti";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import GenderRadio from "../GenderRadio";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [emergencyContactNumber, setEmergencyContactNumber] = useState<string | undefined>();
  const [selectedGender, setSelectedGender] = useState<"" | "Male" | "Female" | "Other">("");

  const handlePhoneChange = (phone?: string) => {
    setValue("phone", phone ?? "");
    setPhoneValue(phone);
  };

  const handleEmergencyContactChange = (emergencyContactNumber?: string) => {
    setValue("emergencyContactNumber", emergencyContactNumber ?? "");
    setEmergencyContactNumber(emergencyContactNumber);
  };

  const handleCheckboxChange = (gender?: "Male" | "Female" | "Other") => {
    setValue("gender", gender ?? "Male");
    setSelectedGender(gender ?? "");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
  });

  const handleSubmitRegister: SubmitHandler<z.infer<typeof PatientFormValidation>> = async (data) => {
    console.log(data, "<---dihandleSubmitRegister");
  };

  console.log(errors, "<---diregisterForm");

  return (
    <form onSubmit={handleSubmit(handleSubmitRegister)} className="bg-rose-600 space-y-10">
      {/* Personal Information */}
      <section className="bg-violet-500 space-y-5">
        <h2 className="sub-header">Personal Information</h2>
        <div className="bg-lime-600 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative col-span-2">
            <InputField icon={<FaBarsStaggered size={18} />} type="text" placeholder="Full Name" name="name" propData={{ ...register("name") }} />

            {errors.name && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.name.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<HiOutlineMail size={22} />} type="email" placeholder="Email" name="email" propData={{ ...register("email") }} />

            {errors.email && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.email.message as string}</p>}
          </div>

          <div className="relative">
            <PhoneInput defaultCountry="US" international withCountryCallingCode placeholder="Phone Number" value={phoneValue} onChange={handlePhoneChange} className="input-phone" />

            {errors.phone && phoneValue === undefined && <p className="absolute -bottom-5 text-red-500 text-sm">Phone is {errors.phone.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<CiCalendar size={22} />} type="text" placeholder="Date of birth" name="birthDate" propData={{ ...register("birthDate") }} />

            {errors.birthDate && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.birthDate.message as string}</p>}
          </div>

          <div className="relative">
            <GenderRadio onRadioChange={handleCheckboxChange} selectedGender={selectedGender} errors={{ gender: errors?.gender as { message: string } | undefined }} />
          </div>

          <div className="relative">
            <InputField icon={<IoLocationOutline size={22} />} type="text" placeholder="Address" name="address" propData={{ ...register("address") }} />

            {errors.address && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.address.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<PiBag size={22} />} type="text" placeholder="Occupation" name="occupation" propData={{ ...register("occupation") }} />

            {errors.occupation && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.occupation.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<TiContacts size={18} />} type="text" placeholder="Emergency contact name" name="emergencyContactName" propData={{ ...register("emergencyContactName") }} />

            {errors.emergencyContactName && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.emergencyContactName.message as string}</p>}
          </div>

          <div className="relative">
            <PhoneInput defaultCountry="US" international withCountryCallingCode placeholder="Emergency contact number" value={emergencyContactNumber} onChange={handleEmergencyContactChange} className="input-phone" />

            {errors.emergencyContactNumber && emergencyContactNumber === undefined && <p className="absolute -bottom-5 text-red-500 text-sm">Emergency Contact Phone is {errors.emergencyContactNumber.message as string}</p>}
          </div>
        </div>
      </section>

      {/* Medical Information */}
      <section className="bg-fuchsia-500">
        <h2 className="sub-header">Medical Information</h2>
      </section>

      {/* Identification and Verification */}
      <section className="bg-sky-500">
        <h2 className="sub-header">Identification and Verification</h2>
      </section>

      {/* Consent and Privacy */}
      <section className="bg-emerald-500">
        <h2 className="sub-header">Consent and Privacy</h2>
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

export default RegisterForm;
