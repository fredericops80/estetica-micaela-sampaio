import "server-only";
import { mockAdapter } from "./mock";
import { httpAdapter } from "./http";
import type { BookrAdapter } from "./types";

export function getBookr(): BookrAdapter {
  if (process.env.BOOKR_API_URL && process.env.BOOKR_API_KEY) return httpAdapter;
  return mockAdapter;
}

export type * from "./types";
