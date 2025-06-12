import type { TNullable } from "~/types/generics";

export type IProjectContent = IProjectContentEntity[];
export interface IProject {
  id: number;
  title: string;
  caption: string;
  thumbnail?: TNullable<string>;
  tags: string[];
  content: IProjectContent;
  previewLink?: TNullable<string>;
  productionLink?: TNullable<string>;
  draft: boolean;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: TNullable<Date>;
}
export type IProjectCreate = Omit<IProject, "id" | "draft" | "createdAt" | "updatedAt" | "archivedAt">;
export type IProjectUpdate = Partial<IProjectCreate & Pick<IProject, "draft">>;

export const ProjectEntityTypes = ["paragraph", "title", "image", "columns"] as const;
export type EProjectEntityType = typeof ProjectEntityTypes[number];

export interface IProjectContentEntity {
  type: EProjectEntityType;
}
export interface IProjectParagraph extends IProjectContentEntity {
  type: "paragraph";
  content: string;
}
export interface IProjectTitle extends IProjectContentEntity {
  type: "title";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}
export interface IProjectImage extends IProjectContentEntity {
  type: "image";
  mim: string;
  url: string;
}
export interface IProjectColumns extends IProjectContentEntity {
  type: "columns";
  columns: IProjectStackable[];
}

export type IProjectStackable =
  | IProjectParagraph
  | IProjectTitle
  | IProjectImage;
