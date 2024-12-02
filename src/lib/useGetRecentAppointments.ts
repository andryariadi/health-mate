import { useQuery } from "@tanstack/react-query";
// import { getRecentAppointmentList } from "./actions";

export const useRecentAppointments = () => {
  return useQuery({
    queryKey: ["recentAppointments"], // Unique key untuk cache
    // queryFn: getRecentAppointmentList, // Fungsi untuk fetch data
    refetchInterval: 60000, // 60 detik (1 menit) untuk polling otomatis
    staleTime: 60000, // Data dianggap valid selama 60 detik
    refetchOnWindowFocus: false,
  });
};
