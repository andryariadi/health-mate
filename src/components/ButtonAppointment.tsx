"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ButtonAppointment = ({ userId }: { userId: string }) => {
  return (
    <motion.button
      className="w-fit py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={`/patients/${userId}/new-appointment`}>Book another appointment</Link>
    </motion.button>
  );
};

export default ButtonAppointment;
