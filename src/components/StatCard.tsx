import { IconType } from "react-icons/lib";

type StatCardProps = {
  title: string;
  value: number | undefined;
  icon: IconType;
  color?: string;
  bottom?: string;
  right?: string;
  colorBg?: string;
};

const StatCard = ({ title, value = 0, icon: Icon, color, bottom, right, colorBg }: StatCardProps) => {
  return (
    <div className={`relative bg-gray-800 p-5 rounded-lg shadow-lg overflow-hidden min-w-[20rem]`}>
      <div className="space-y-2">
        <p className={`${color} text-sm max-w-[10rem]`}>{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>

      <div className={`absolute inset-0 bg-gradient-to-bl ${colorBg} opacity-30`} />

      <div className={`absolute ${bottom} ${right} ${color} opacity-50`}>
        <Icon size={135} />
      </div>
    </div>
  );
};

export default StatCard;
