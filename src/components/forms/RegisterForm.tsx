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

const RegisterForm = () => {
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [emergencyContact, setEmergencyContact] = useState<string | undefined>();
  const [selectedGender, setSelectedGender] = useState("");

  const handlePhoneChange = (phone?: string) => {
    // setValue("phone", phone ?? "");
    setPhoneValue(phone);
  };

  const handleEmergencyContactChange = (phone?: string) => {
    // setValue("phone", phone ?? "");
    setEmergencyContact(phone);
  };

  const handleCheckboxChange = (gender?: string) => {
    // setValue("gender", gender);
    setSelectedGender(gender);
  };

  const errors = "";

  return (
    <form className="bg-rose-600 space-y-10">
      {/* Personal Information */}
      <section className="bg-violet-500 space-y-5">
        <h2 className="sub-header">Personal Information</h2>

        <div className="bg-lime-600 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative col-span-2">
            <InputField icon={<FaBarsStaggered size={18} />} type="text" placeholder="Full Name" name="name" />
          </div>

          <div className="relative">
            <InputField icon={<HiOutlineMail size={22} />} type="email" placeholder="Email" name="email" />
          </div>

          <div className="relative">
            <PhoneInput defaultCountry="US" international withCountryCallingCode placeholder="Phone Number" value={phoneValue} onChange={handlePhoneChange} className="input-phone" />
          </div>

          <div className="relative">
            <InputField icon={<CiCalendar size={22} />} type="text" placeholder="Date of birth" name="name" />
          </div>

          <div className="relative">
            <GenderRadio onRadioChange={handleCheckboxChange} selectedGender={selectedGender} errors={errors} />
          </div>

          <div className="relative">
            <InputField icon={<IoLocationOutline size={22} />} type="text" placeholder="Address" name="name" />
          </div>

          <div className="relative">
            <InputField icon={<PiBag size={22} />} type="text" placeholder="Occupation" name="name" />
          </div>

          <div className="relative">
            <InputField icon={<TiContacts size={18} />} type="text" placeholder="Emergency contact name" name="name" />
          </div>

          <div className="relative">
            <PhoneInput defaultCountry="US" international withCountryCallingCode placeholder="Phone Number" value={emergencyContact} onChange={handleEmergencyContactChange} className="input-phone" />
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
    </form>
  );
};

export default RegisterForm;
