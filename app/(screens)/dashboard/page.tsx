import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="p-5">
      {/* Header */}
      <header className="flex justify-between p-5 bg-[#AAD4E4] rounded-xl border">
        <div>
          <h1 className="font-bold text-2xl">CURA</h1>
          <p className="text-xl italic">
            Your Family&apos;s health, Organised.
          </p>
        </div>

        <button type="button" className="cursor-pointer" aria-label="Open menu">
          <Image
            src="/assets/icons/menuIcon.svg"
            height={50}
            width={50}
            alt=""
          />
        </button>
      </header>

      {/* Upcoming */}
      <section className="m-5">
        <div className="flex gap-2 items-center mb-5">
          <Image
            src="/assets/icons/upcomingIcon.svg"
            height={50}
            width={50}
            alt=""
          />
          <h2 className="text-xl font-semibold">Upcoming</h2>
        </div>

        <div className="flex justify-between gap-5">
          <div className="w-1/3 p-5 bg-[#AAD4E4] rounded-xl border text-center">
            <h3 className="font-bold text-xl">Next Appointments</h3>
            <p>No Appointments</p>
          </div>

          <div className="w-1/3 p-5 bg-[#AAD4E4] rounded-xl border text-center">
            <h3 className="font-bold text-xl">Next Medications</h3>
            <p>No Medications</p>
          </div>
        </div>
      </section>

      {/* Family */}
      <section className="m-5">
        <div className="flex gap-2 items-center mb-5">
          <Image
            src="/assets/icons/familyIcon.svg"
            height={50}
            width={50}
            alt=""
          />
          <h2 className="text-xl font-semibold">My Family</h2>
        </div>

        <div className="flex justify-around gap-5 p-5 bg-[#AAD4E4] rounded-xl border">
          <button type="button" className="cursor-pointer">
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/assets/icons/avatarIcon.svg"
                height={50}
                width={50}
                alt=""
              />
              <p className="italic">Me</p>
            </div>
          </button>

          <button type="button" className="cursor-pointer">
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/assets/icons/avatarIcon.svg"
                height={50}
                width={50}
                alt=""
              />
              <p className="italic">Wife</p>
            </div>
          </button>

          <button type="button" className="cursor-pointer">
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/assets/icons/avatarIcon.svg"
                height={50}
                width={50}
                alt=""
              />
              <p className="italic">Father</p>
            </div>
          </button>

          <button type="button" className="cursor-pointer">
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/assets/icons/avatarIcon.svg"
                height={50}
                width={50}
                alt=""
              />
              <p className="italic">Mother</p>
            </div>
          </button>
        </div>
      </section>

      {/* Medical Records */}
      <section className="m-5">
        <div className="flex gap-2 items-center mb-5">
          <Image
            src="/assets/icons/medicalRecordIcon.svg"
            height={50}
            width={50}
            alt=""
          />
          <h2 className="text-xl font-semibold">Recent Medical Records</h2>
        </div>

        <div className="flex justify-around gap-5 p-5 bg-[#AAD4E4] rounded-xl border">
          <p className="text-xl font-semibold">No recent records</p>
        </div>
      </section>
    </div>
  );
}
