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
import { RiServiceLine, RiCustomerService2Line, RiSortNumberDesc } from "react-icons/ri";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaField from "../TextareaField";
import { Doctors, IdentificationTypes } from "@/constants";
import Image from "next/image";
import PrivacyCheckbox from "../PrivacyCheckbox";

const RegisterForm = () => {
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [emergencyContactNumber, setEmergencyContactNumber] = useState<string | undefined>();
  const [selectedGender, setSelectedGender] = useState<"" | "Male" | "Female" | "Other">("Male");
  const [treatmentConsent, setTreatmentConsent] = useState<false | true>(false);
  const [disclosureConsent, setDisclosureConsent] = useState<false | true>(false);
  const [privacyConsent, setPrivacyConsent] = useState<false | true>(false);

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

  const onTreatmentConsentChange = (treatmentConsent?: false | true) => {
    setValue("treatmentConsent", treatmentConsent ?? false);
    setTreatmentConsent(treatmentConsent ?? false);
  };

  const onDisclosureConsentChange = (disclosureConsent?: false | true) => {
    setValue("disclosureConsent", disclosureConsent ?? false);
    setDisclosureConsent(disclosureConsent ?? false);
  };

  const onPrivacyConsentChange = (privacyConsent?: false | true) => {
    setValue("privacyConsent", privacyConsent ?? false);
    setPrivacyConsent(privacyConsent ?? false);
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

  console.log({ errors, treatmentConsent }, "<---diregisterForm");

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
            <InputField icon={<TiContacts size={18} />} type="text" placeholder="Emergency Contact Name" name="emergencyContactName" propData={{ ...register("emergencyContactName") }} />

            {errors.emergencyContactName && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.emergencyContactName.message as string}</p>}
          </div>

          <div className="relative">
            <PhoneInput defaultCountry="US" international withCountryCallingCode placeholder="Emergency Contact Number" value={emergencyContactNumber} onChange={handleEmergencyContactChange} className="input-phone" />

            {errors.emergencyContactNumber && emergencyContactNumber === undefined && <p className="absolute -bottom-5 text-red-500 text-sm">Emergency Contact Phone is {errors.emergencyContactNumber.message as string}</p>}
          </div>
        </div>
      </section>

      {/* Medical Information */}
      <section className="bg-fuchsia-500 space-y-5">
        <h2 className="sub-header">Medical Information</h2>

        <div className="bg-lime-600 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative col-span-2">
            <select
              id="primaryPhysician"
              className="w-full pl-4 py-3 bg-dark-400 rounded-lg outline-none border border-gray-800 focus:border-green-500  placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 text-sm text-gray-500 cursor-pointer"
              {...register("primaryPhysician")}
            >
              <option value="">Primary cara physician</option>
              {Doctors.map((doctor, i) => (
                <option key={i} value={doctor.name} className="flex items-center gap-2">
                  <Image src={doctor.image} width={50} height={50} alt="doctor" />
                  <span>{doctor.name}</span>
                </option>
              ))}
            </select>

            {errors.primaryPhysician && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.primaryPhysician.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<RiServiceLine size={18} />} type="text" placeholder="Insurance Provider" name="insuranceProvider" propData={{ ...register("insuranceProvider") }} />

            {errors.insuranceProvider && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.insuranceProvider.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<RiCustomerService2Line size={18} />} type="text" placeholder="Insurance Policy Number" name="insurancePolicyNumber" propData={{ ...register("insurancePolicyNumber") }} />

            {errors.insurancePolicyNumber && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.insurancePolicyNumber.message as string}</p>}
          </div>

          <div className="relative">
            <TextareaField id="allergies" rows={5} cols={30} placeholder={`Allergies\nex: Peanuts, Penicillin, Pollen, etc.`} propsData={{ ...register("allergies") }} />

            {errors.allergies && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.allergies.message as string}</p>}
          </div>

          <div className="relative">
            <TextareaField id="currentMedication" rows={5} cols={30} placeholder={`Current Medication\nex: Ibuprofen 200mg, Levothyroxine 500mg, etc.`} propsData={{ ...register("currentMedication") }} />

            {errors.currentMedication && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.currentMedication.message as string}</p>}
          </div>

          <div className="relative">
            <TextareaField id="familyMedicalHistory" rows={5} cols={30} placeholder={`Family Medical History\nex: Mother had breast cancer, etc.`} propsData={{ ...register("familyMedicalHistory") }} />

            {errors.familyMedicalHistory && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.familyMedicalHistory.message as string}</p>}
          </div>

          <div className="relative">
            <TextareaField id="pastMedicalHistory" rows={5} cols={30} placeholder={`Past Medical History\nex: Asthma diagnosis in childhood, etc.`} propsData={{ ...register("pastMedicalHistory") }} />

            {errors.pastMedicalHistory && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.pastMedicalHistory.message as string}</p>}
          </div>
        </div>
      </section>

      {/* Identification and Verification */}
      <section className="bg-sky-500 space-y-5">
        <h2 className="sub-header">Identification and Verification</h2>

        <div className="bg-lime-600 grid grid-cols-1 gap-10">
          <div className="relative">
            <select
              id="identificationType"
              className="w-full pl-4 py-3 bg-dark-400 rounded-lg outline-none border border-gray-800 focus:border-green-500  placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 text-sm text-gray-500 cursor-pointer"
              {...register("identificationType")}
            >
              <option value="">Identification type</option>
              {IdentificationTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.identificationType && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.identificationType.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<RiSortNumberDesc size={18} />} type="text" placeholder="Identification Number" name="identificationNumber" propData={{ ...register("identificationNumber") }} />

            {errors.identificationNumber && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.identificationNumber.message as string}</p>}
          </div>
        </div>
      </section>

      {/* Consent and Privacy */}
      <section className="bg-emerald-500 space-y-5">
        <h2 className="sub-header">Consent and Privacy</h2>

        <div className="bg-lime-600 grid grid-cols-1 gap-7">
          <PrivacyCheckbox label="I consent to receive treatment for my health condition." onCheckboxChange={onTreatmentConsentChange} selectedBoolean={treatmentConsent} error={errors.treatmentConsent?.message as string} />

          <PrivacyCheckbox
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
            onCheckboxChange={onDisclosureConsentChange}
            selectedBoolean={disclosureConsent}
            error={errors.disclosureConsent?.message as string}
          />

          <PrivacyCheckbox
            label="I acknowledge that I have reviewed and agree to the
            privacy policy."
            onCheckboxChange={onPrivacyConsentChange}
            selectedBoolean={privacyConsent}
            error={errors.privacyConsent?.message as string}
          />
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

export default RegisterForm;
