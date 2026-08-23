import { useMutation } from "@tanstack/react-query";

import { verifyVisitorPass } from "../../services/visitorpass";
import type { VerifyVisitorPassPayload,VerifiedVisitorPass,} from "../../types/visitorspass";

export function useVerifyVisitorPass() {
  return useMutation<
    VerifiedVisitorPass,
    Error,
    VerifyVisitorPassPayload
  >({mutationFn: verifyVisitorPass,});
}