import { useQuery } from "@tanstack/react-query";

import { getApiHealth } from "../services/healthService";


export const useHealth = () => {

  return useQuery({
    queryKey: ["api-health"],

    queryFn: getApiHealth,

    refetchInterval: 30000,

    retry: 2,
  });
};