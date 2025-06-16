import type { IProject, IProjectCreate, IProjectUpdate } from "~/types/projects";
import prisma from "~/prisma";
import type { TArray } from "~/types/generics";
import { LmNotFoundError } from "~/types/generics";
import type { AdminListQuery, AdminListReturn } from "~/types/admin/list";
import type { IWysiwygContent } from "~/types/wysiwyg";

export type ProjectDataBody = Omit<IProject, "content" | "title" | "caption"> & { content: string; title: string; caption: string };
const parseProject = (initial: ProjectDataBody): IProject => ({
  ...initial,
  title: JSON.parse(initial.title),
  caption: JSON.parse(initial.caption),
  content: JSON.parse(initial.content) as IWysiwygContent,
});

export async function createProject(data: IProjectCreate): Promise<IProject> {
  return parseProject(await prisma.project.create({
    data: {
      ...data,
      title: JSON.stringify(data.title),
      caption: JSON.stringify(data.caption),
      content: JSON.stringify(data.content),
    },
  }));
}
export async function updateProject(id: number, data: IProjectUpdate): Promise<IProject> {
  if (!await exists(id)) throw new LmNotFoundError(`Project not found! (#${id})`);

  const body = { ...data } as unknown as ProjectDataBody;
  if (body.title) body.title = JSON.stringify(body.title);
  if (body.caption) body.caption = JSON.stringify(body.caption);
  if (body.content) body.content = JSON.stringify(body.content);

  return parseProject(await prisma.project.update({
    where: {
      id,
      archivedAt: null,
    },
    data: body,
  }));
}
// If @param(state) is set to true, the project will be archived; otherwise it will be restored
export async function archiveProject(id: number, state: boolean): Promise<IProject> {
  if (!await exists(id)) throw new LmNotFoundError(`Project not found! (#${id})`);
  return parseProject(await prisma.project.update({
    where: {
      id,
    },
    data: {
      archivedAt: state ? new Date() : null,
    },
  }));
}

export async function getPublishedProjects(): Promise<TArray<IProject>> {
  return (await prisma.project.findMany({
    where: {
      archivedAt: null,
      draft: false,
    },
  })).map(parseProject);
}
export async function getAllProjects({ offset, limit }: AdminListQuery): Promise<AdminListReturn<IProject>> {
  const list = (await prisma.project.findMany({
    take: limit,
    skip: offset,
  })).map(parseProject);
  return {
    data: list,
    currentCount: list.length,
    totalCount: await prisma.project.count(),
  };
}
export async function getProject(id: number, draftAllowed: boolean = false): Promise<IProject> {
  const where = draftAllowed ? {} : { draft: false };
  const project = await prisma.project.findUnique({
    where: {
      id,
      ...where,
      archivedAt: null,
    },
  });
  if (!project) throw new LmNotFoundError(`Project not found! (#${id})`);
  return parseProject(project);
}

export async function exists(id: number): Promise<boolean> {
  return !!(await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  }));
}
