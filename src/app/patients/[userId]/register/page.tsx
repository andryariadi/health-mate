import Image from "next/image";

const PatientRegisterPage = () => {
  return (
    <div className="bg-violet-500 max-h-screen h-screen flex">
      {/* Left */}
      <section className="bg-amber-500 remove-scrollbar container">
        <div className="bg-sky-600 sub-container max-w-[860px] flex-1">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={35} height={35} />
            <span className="text-2xl font-bold">HealthMate</span>
          </div>

          <div className="space-y-1">
            <h1 className="header">Hi there... 👋</h1>
            <span className="text-14-regular text-dark-700">Schedule your first appointments.</span>
          </div>
        </div>
      </section>

      {/* Right */}
      <section className="bg-rose-500">Andry</section>
    </div>
  );
};

export default PatientRegisterPage;
