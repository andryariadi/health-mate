This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- GenderRadio before refactor code -->
<!-- import React from "react";

interface GenderRadioProps {
onRadioChange: (gender: "Male" | "Female" | "Other") => void;
selectedGender: "Male" | "Female" | "Other";
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
{errors.gender && (
<span className="text-rose-500 text-xs absolute -bottom-9">
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
          {errors.gender && (
            <span className="text-rose-500 text-xs absolute -bottom-9">
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
          {errors.gender && (
            <span className="text-rose-500 text-xs absolute -bottom-9">
              Gender {""}
              {errors.gender.message}
            </span>
          )}
        </label>
      </div>
    </div>

);
};

export default GenderRadio; -->
<!-- GenderRadio before refactor code -->
