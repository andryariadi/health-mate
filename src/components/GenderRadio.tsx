import React from "react";

interface GenderRadioProps {
  onRadioChange: (gender: "Male" | "Female" | "Other") => void;
  selectedGender: "Male" | "Female" | "Other" | "";
  errors: {
    gender?: {
      message: string;
    };
  };
}

const GenderRadio: React.FC<GenderRadioProps> = ({ onRadioChange, selectedGender, errors }) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="form-control bg-dark-400 rounded-lg py-1 px-5 flex-auto">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Male</span>
          <input type="radio" className={`radio radio-success border-green-500 ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "Male"} onChange={() => onRadioChange("Male")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-9">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>

      <div className="form-control bg-dark-400 rounded-lg py-1 px-5 flex-auto">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Female</span>
          <input type="radio" className={`radio radio-success border-green-500 ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "Female"} onChange={() => onRadioChange("Female")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-9">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>

      <div className="form-control bg-dark-400 rounded-lg py-1 px-5 flex-auto">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Other</span>
          <input type="radio" className={`radio radio-success border-green-500 ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "Other"} onChange={() => onRadioChange("Other")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-9">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GenderRadio;
