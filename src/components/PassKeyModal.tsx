"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const PassKeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const handleCloseModal = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Admin Access Verification
            <IoIosCloseCircleOutline size={22} onClick={handleCloseModal} className="cursor-pointer hover:scale-110 transition-all duration-300" />
          </AlertDialogTitle>
          <AlertDialogDescription>To access the admin page, please verify your passkey.</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="b-sky-600">
          <InputOTP maxLength={6} value={passkey} onChange={(val) => setPasskey(val)}>
            <InputOTPGroup className="b-rose-700 shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot" />
              <InputOTPSlot index={1} className="shad-otp-slot" />
              <InputOTPSlot index={2} className="shad-otp-slot" />
              <InputOTPSlot index={3} className="shad-otp-slot" />
              <InputOTPSlot index={4} className="shad-otp-slot" />
              <InputOTPSlot index={5} className="shad-otp-slot" />
            </InputOTPGroup>
          </InputOTP>

          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction className="shad-primary-btn">Submit Admin Passkey</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
