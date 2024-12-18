import React from "react";

interface GenderRadioProps {
  onRadioChange: (gender: "male" | "female" | "other") => void;
  selectedGender: "male" | "female" | "other";
  errors: {
    gender?: {
      message: string;
    };
  };
}

const GENDER_OPTIONS: Array<"male" | "female" | "other"> = ["male", "female", "other"];

const GenderRadio: React.FC<GenderRadioProps> = ({ onRadioChange, selectedGender, errors }) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-5 lg:gap-2 xl:gap-5">
        {GENDER_OPTIONS.map((gender) => (
          <div key={gender} className="form-control bg-dark-400 rounded-lg py-1 px-5 lg:px-2 2xl:px-5 flex-auto">
            <label className="relative label gap-2 cursor-pointer">
              <span className="label-text text-xs text-neutral-100">{gender}</span>
              <input type="radio" className={`radio radio-success border-green-500 ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === gender} onChange={() => onRadioChange(gender)} />
            </label>
          </div>
        ))}
      </div>

      {errors.gender && <span className="text-rose-500 text-xs block mt-2 text-center">Gender {errors.gender.message}</span>}
    </div>
  );
};

export default GenderRadio;
