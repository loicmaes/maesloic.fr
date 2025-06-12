import type { TArray } from "~/types/generics";

export interface AdminListQuery {
  offset?: number;
  limit?: number;
}
export interface AdminListReturn<T> {
  data: TArray<T>;
  currentCount: number;
  totalCount: number;
}
