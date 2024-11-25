import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  console.log(isAdmin, "<---dihomePage");

  return (
    <main className="b-violet-500 flex max-h-screen h-screen">
      {/* Passkey Modal */}
      {isAdmin && <PassKeyModal />}

      {/* Left */}
      <section className="b-rose-500 remove-scrollbar container my-auto">
        <div className="b-amber-500 sub-container max-w-[496px] space-y-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={35} height={35} />
            <span className="text-2xl font-bold">HealthMate</span>
          </div>

          <div className="space-y-1">
            <h1 className="header">Hi there... 👋</h1>
            <span className="text-14-regular text-dark-700">Schedule your first appointments.</span>
          </div>

          {/* Form */}
          <PatientForm />

          {/* Copyright and Admin */}
          <div className="text-14-regular flex items-center justify-between">
            <span className="text-dark-600">© 2024 HealthMate</span>
            <Link href="/?admin=true" className="text-emerald-500 font-semibold hover:scale-110 transition-all duration-300">
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Right */}
      <Image src="/assets/images/onboarding-img.png" alt="patient" height={1000} width={1000} className="max-w-[50%] side-img" />
    </main>
  );
}
