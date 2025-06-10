import type { HttpEvent } from "~/types/generics";
import type { AdminListQuery } from "~/types/admin/list";

export function getAdminListQuery(event: HttpEvent): AdminListQuery {
  const { offset, limit } = getQuery<AdminListQuery>(event);

  return {
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  };
}
