"use client";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const PassKeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  // To prevent if user has already set the passkey
  const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const handleValidatePasskey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);

      localStorage.setItem("accessKey", encryptedKey);

      setOpen(false);

      console.log(encryptedKey, "<---dihandleValidatePasskey");
    } else {
      setError("Invalid passkey, please try again!");
    }
  };

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
          <AlertDialogAction onClick={handleValidatePasskey} className="shad-primary-btn">
            Submit Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
