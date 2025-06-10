import type { TNullable } from "~/types/generics";

export interface IService {
  id: number;
  title: string;
  caption: string;
  icon: string;
  displayed: boolean;
  archivedAt?: TNullable<Date>;
}
export type IServiceCreate = Omit<IService, "id" | "archivedAt">;
export type IServiceUpdate = Partial<IServiceCreate>;
