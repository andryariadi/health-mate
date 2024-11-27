import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

const StatusBadge = ({ status }: { status: Status }) => {
  console.log(status, "<---diStatusBadge");

  return (
    <div
      className={clsx("status-badge bg-opacity-50", {
        "bg-green-600": status === "scheduled",
        "bg-yellow-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image src={StatusIcon[status]} alt={status} width={24} height={24} className="h-fit w-3" />

      <p
        className={clsx("text-12-semibold capitalize", {
          "text-emerald-500": status === "scheduled",
          "text-yellow-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
