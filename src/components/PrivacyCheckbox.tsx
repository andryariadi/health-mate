import React from "react";

type PrivacyCheckboxProps = {
  onCheckboxChange: (value: boolean) => void;
  selectedBoolean: boolean;
  error?: string;
  label: string;
};

const PrivacyCheckbox: React.FC<PrivacyCheckboxProps> = ({ onCheckboxChange, selectedBoolean, error, label }) => {
  return (
    <div className="form-control gap-1">
      <label className="relative flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={selectedBoolean} onChange={(e) => onCheckboxChange(e.target.checked)} className={`checkbox checkbox-success border-green-500 ${error ? "border-rose-800 hover:border-rose-800" : ""}`} />
        <span className="label-text text-neutral-100">{label}</span>
      </label>

      {error && selectedBoolean === false && <p className="text-rose-800 text-xs">{error}</p>}
    </div>
  );
};

export default PrivacyCheckbox;
