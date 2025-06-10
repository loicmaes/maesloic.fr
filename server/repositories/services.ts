import type { IService, IServiceCreate, IServiceUpdate } from "~/types/services";
import prisma from "@/prisma";
import type { AdminListReturn } from "~/types/admin/list";
import { LmNotFoundError } from "~/types/generics";

export type ServiceDataBody = Omit<IService, "title" | "caption"> & { title: string; caption: string };
export function parseService(service: ServiceDataBody): IService {
  return {
    ...service,
    title: JSON.parse(service.title),
    caption: JSON.parse(service.caption),
  };
}

export async function createService(data: IServiceCreate): Promise<IService> {
  return parseService(await prisma.service.create({
    data: {
      ...data,
      title: JSON.stringify(data.title),
      caption: JSON.stringify(data.caption),
    },
  }));
}
export async function updateService(id: number, data: IServiceUpdate): Promise<IService> {
  if (!await checkExists(id)) throw new LmNotFoundError(`Service not found! (#${id})`);

  const body = { ...data } as unknown as ServiceDataBody;
  if (body.title) body.title = JSON.stringify(body.title);
  if (body.caption) body.caption = JSON.stringify(body.caption);

  return parseService(await prisma.service.update({
    where: {
      id,
    },
    data: body,
  }));
}

// If @param(archived) is set to true, service will be archived; otherwise it will be restored
export async function archiveService(id: number, archived: boolean): Promise<IService> {
  if (!await checkExists(id)) throw new LmNotFoundError(`Service not found! (#${id})`);
  return parseService(await prisma.service.update({
    where: {
      id,
    },
    data: {
      archivedAt: archived ? new Date() : null,
    },
  }));
}

export async function recoverServices(): Promise<IService[]> {
  return (await prisma.service.findMany({
    where: {
      displayed: true,
      archivedAt: null,
    },
    orderBy: {
      id: "asc",
    },
  })).map(parseService);
}
export async function recoverAllServices(limit: number = 20, offset: number = 0): Promise<AdminListReturn<IService>> {
  const list = await prisma.service.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      id: "desc",
    },
  });

  return {
    data: list.map(parseService),
    currentCount: list.length,
    totalCount: await prisma.service.count(),
  };
}

async function checkExists(id: number): Promise<boolean> {
  return !!(await prisma.service.findUnique({
    where: {
      id,
    },
  }));
}
