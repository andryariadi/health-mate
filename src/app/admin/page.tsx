import StatCard from "@/components/StatCard";
import Image from "next/image";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { FaRegCalendarTimes } from "react-icons/fa";
import { columns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions";

const AdminPage = async () => {
  // const appointments = await getAppoinyemts();

  const appointments = await getRecentAppointmentList();

  console.log(appointments, "<---diadminPage");

  return (
    <div className="mx-auto max-w-7xl flex flex-col space-y-14">
      <header className="admin-header">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={35} height={35} />
          <span className="text-2xl font-bold">HealthMate</span>
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Start the day with managing new appointments</p>
        </section>

        <section className="admin-stat">
          <StatCard icon={LuCalendarDays} color="text-yellow-500" bottom="-bottom-2" right="-right-3" colorBg="from-yellow-600 to-amber-900" title="Scheduled appointments" value={appointments?.scheduledCount} />

          <StatCard icon={GiSandsOfTime} color="text-cyan-500" bottom="-bottom-2" right="-right-6" colorBg="from-cyan-600 to-sky-900" title="Pending appointments" value={appointments?.pendingCount} />

          <StatCard icon={FaRegCalendarTimes} color="text-rose-500" bottom="-bottom-1" right="-right-2" colorBg="from-rose-600 to-red-900" title="Cancelled appointments" value={appointments?.cancelledCount} />
        </section>

        {/* Table */}
        <DataTable columns={columns} data={appointments?.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
