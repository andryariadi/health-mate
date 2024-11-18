type RadioProps = {
  onRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedGender: string;
  errors: string;
};

const GenderRadio = ({ onRadioChange, selectedGender, errors }) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="form-control bg-dark-400 rounded-lg py-1 px-5 flex-auto">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Male</span>
          <input type="radio" className={`radio radio-success border-green-500 ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "male"} onChange={() => onRadioChange("male")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-7">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>

      <div className="form-control bg-dark-400 rounded-lg py-1 px-5 flex-auto">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Female</span>
          <input type="radio" className={`radio radio-success border-green-500 ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "female"} onChange={() => onRadioChange("female")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-7">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>

      <div className="form-control bg-dark-400 rounded-lg py-1 px-5 flex-auto">
        <label className={`relative label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Other</span>
          <input type="radio" className={`radio radio-success border-green-500 ${errors.gender ? "border-rose-800 hover:border-rose-800" : ""}`} checked={selectedGender === "other"} onChange={() => onRadioChange("other")} />
          {errors.gender && selectedGender === "" && (
            <span data-testid="gender-error" className="text-rose-500 text-xs absolute -bottom-7">
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
