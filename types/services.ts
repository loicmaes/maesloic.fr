import type { TNullable, Translation } from "~/types/generics";

export interface IService {
  id: number;
  title: Translation;
  caption: Translation;
  icon: string;
  displayed: boolean;
  archivedAt?: TNullable<Date>;
}
export type IServiceCreate = Omit<IService, "id" | "archivedAt">;
export type IServiceUpdate = Partial<IServiceCreate>;
