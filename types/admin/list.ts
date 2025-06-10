export interface AdminListQuery {
  offset?: number;
  limit?: number;
}
export interface AdminListReturn<T> {
  data: T[];
  currentCount: number;
  totalCount: number;
}
