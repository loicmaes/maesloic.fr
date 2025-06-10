import type { IService, IServiceCreate, IServiceUpdate } from "~/types/services";
import prisma from "@/prisma";
import type { AdminListReturn } from "~/types/admin/list";
import { LmNotFoundError } from "~/types/generics";

export async function createService(data: IServiceCreate): Promise<IService> {
  return prisma.service.create({
    data,
  });
}
export async function updateService(id: number, data: IServiceUpdate): Promise<IService> {
  if (!await checkExists(id)) throw new LmNotFoundError(`Service not found! (#${id})`);
  return prisma.service.update({
    where: {
      id,
    },
    data,
  });
}

// If @param(archived) is set to true, service will be archived; otherwise it will be restored
export async function archiveService(id: number, archived: boolean): Promise<IService> {
  if (!await checkExists(id)) throw new LmNotFoundError(`Service not found! (#${id})`);
  return prisma.service.update({
    where: {
      id,
    },
    data: {
      archivedAt: archived ? new Date() : null,
    },
  });
}

export async function recoverServices(): Promise<IService[]> {
  return prisma.service.findMany({
    where: {
      displayed: true,
      archivedAt: null,
    },
  });
}
export async function recoverAllServices(limit: number = 20, offset: number = 0): Promise<AdminListReturn<IService>> {
  const list = await prisma.service.findMany({
    take: limit,
    skip: offset,
  });

  return {
    data: list,
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
