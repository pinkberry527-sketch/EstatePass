
export type AccessLog = {
  id: number;
  result: "ALLOWED" | "DENIED";
  reason: string;
  created_at: string;
  visitor: string | null;
  gate: string | null;
  checked_in_at: string | null;
  checked_out_at: string | null;
};

export type AccessLogsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AccessLog[];
};

