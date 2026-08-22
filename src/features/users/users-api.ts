import { http } from "@/lib/http";
import type { UserRecord } from "@/types";

export const getUsersRequest = (search = "") =>
  http<UserRecord[]>(`/api/users?search=${encodeURIComponent(search)}`);
