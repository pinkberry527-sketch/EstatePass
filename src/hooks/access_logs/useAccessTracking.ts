import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  checkInVisitor,
  checkOutVisitor,
} from "../../services/accessTracking";

export function useAccessTracking() {
  const queryClient = useQueryClient();

  const checkIn = useMutation({
    mutationFn: checkInVisitor,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["access-logs"],
      });
    },
  });

  const checkOut = useMutation({
    mutationFn: checkOutVisitor,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["access-logs"],
      });
    },
  });

  return {
    checkIn,
    checkOut,
  };
}