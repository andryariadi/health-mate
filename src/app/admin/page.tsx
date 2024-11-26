import StatCard from "@/components/StatCard";
import Image from "next/image";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { FaRegCalendarTimes } from "react-icons/fa";

const AdminPage = () => {
  return (
    <div className="bg-violet-500 mx-auto max-w-7xl flex flex-col space-y-14">
      <header className="bg-maber-500 admin-header">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={35} height={35} />
          <span className="text-2xl font-bold">HealthMate</span>
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="bg-rose-500 admin-main">
        <section className="bg-sky-600 w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Start the day with managing new appointments</p>
        </section>

        <section className="bg-emerald-500 admin-stat">
          <StatCard icon={LuCalendarDays} color="text-yellow-500" bottom="-bottom-2" right="-right-3" colorBg="from-yellow-600 to-amber-900" title="Total number of scheduled appointments" value={"10"} />

          <StatCard icon={GiSandsOfTime} color="text-cyan-500" bottom="-bottom-2" right="-right-7" colorBg="from-cyan-600 to-sky-900" title="Total number of pending appointments" value={"10"} />

          <StatCard icon={FaRegCalendarTimes} color="text-rose-500" bottom="-bottom-1" right="-right-3" colorBg="from-rose-600 to-red-900" title="Total number of cancelled appointments" value={"10"} />
        </section>

        <div>table</div>
      </main>
    </div>
  );
};

export default AdminPage;
