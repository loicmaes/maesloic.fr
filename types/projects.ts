import type { TNullable, Translation } from "~/types/generics";
import type { IWysiwygContent } from "~/types/wysiwyg";

export interface IProject {
  id: number;
  title: Translation;
  caption: Translation;
  thumbnail?: TNullable<string>;
  tags: string[];
  content: IWysiwygContent;
  previewLink?: TNullable<string>;
  productionLink?: TNullable<string>;
  draft: boolean;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: TNullable<Date>;
}
export type IProjectCreate = Omit<IProject, "id" | "draft" | "createdAt" | "updatedAt" | "archivedAt">;
export type IProjectUpdate = Partial<IProjectCreate & Pick<IProject, "draft">>;
