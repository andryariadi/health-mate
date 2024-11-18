"use client";

import { FaBarsStaggered } from "react-icons/fa6";
import InputField from "../InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import E164Number from "react-phone-number-input";
import { useState } from "react";

const PatientForm = () => {
  const [phoneValue, setPhoneValue] = useState<string | undefined>();

  const handlePhoneChange = (phone?: string) => {
    setValue("phone", phone ?? "");
    setPhoneValue(phone);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
  });

  const handleSubmitUser: SubmitHandler<z.infer<typeof UserFormValidation>> = async (data) => {
    console.log(data, "<---dihandlesubmitUser");
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitUser)} className="b-sky-600 space-y-10">
      <div className="relative">
        <InputField icon={<FaBarsStaggered size={18} />} type="text" placeholder="Full Name" name="name" propData={{ ...register("name") }} />

        {errors.name && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.name.message as string}</p>}
      </div>

      <div className="relative">
        <InputField icon={<HiOutlineMail size={22} />} type="email" placeholder="Email" name="email" propData={{ ...register("email") }} />

        {errors.email && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.email.message as string}</p>}
      </div>

      <div className="relative">
        <PhoneInput defaultCountry="US" international withCountryCallingCode placeholder="Phone Number" value={phoneValue} onChange={handlePhoneChange} className="input-phone" />
      </div>

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
            <span>Get Started</span>
            <BsSend size={18} />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default PatientForm;
