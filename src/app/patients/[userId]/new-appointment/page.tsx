import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions";

type ParamsProp = Promise<{
  params: { [key: string]: string };
}>;

const NewOppointmentPage = async (props: ParamsProp) => {
  const { params } = await props;

  const userId = params.userId;
  const patient = await getPatient(userId);

  console.log({ props, patient }, "<---diappointmentpage");

  return (
    <div className="max-h-screen h-screen flex">
      {/* Left */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 space-y-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={35} height={35} />
            <span className="text-2xl font-bold">HealthMate</span>
          </div>

          <div className="space-y-1">
            <h1 className="header">Hi there... 👋</h1>
            <span className="text-14-regular text-dark-700">Request a new oppointment in 10 seconds.</span>
          </div>

          {/* Form */}
          <AppointmentForm type="create" userId={userId} patientId={patient?.$id ?? ""} />
          <p className="copyright">© 2024 HealthMate</p>
        </div>
      </section>

      {/* Right */}
      <Image src="/assets/images/appointment-img.png" height={1000} width={1000} alt="patient" className="side-img max-w-[300px] lg:max-w-[390px]" />
    </div>
  );
};

export default NewOppointmentPage;
