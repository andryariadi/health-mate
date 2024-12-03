import ButtonAppointment from "@/components/ButtonAppointment";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";

type SearchParamProps = Promise<{
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>;

const SuccessPage = async (props: SearchParamProps) => {
  const { params, searchParams } = await props;

  const userId = params.userId ?? "";
  const appointmentId = (searchParams.appointmentId as string) ?? "";

  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find((doctor) => doctor.name === appointment?.primaryPhysician);

  console.log({ props, userId, appointmentId, appointment, doctor }, "<---disuccessPage");

  return (
    <div className="flex min-h-screen px-[5%]">
      <div className="success-img">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={35} height={35} />
          <span className="text-2xl font-bold">HealthMate</span>
        </Link>

        {/* Title */}
        <section className="flex flex-col items-center space-y-5">
          <Image src="/assets/gifs/success.gif" alt="success" height={300} width={280} />

          <h2 className="header max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>

          {/* Doctoc  */}
          <div className="flex items-center gap-2">
            <Image src={doctor?.image ?? ""} alt="doctor" height={50} width={50} />
            <span>{doctor?.name}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <CiCalendar size={22} />
            <span>{formatDateTime(appointment?.schedule).dateTime}</span>
          </div>
        </section>

        {/* Button */}
        <ButtonAppointment userId={userId} />

        <p className="copyright">© 2024 HealthMate</p>
      </div>
    </div>
  );
};

export default SuccessPage;
