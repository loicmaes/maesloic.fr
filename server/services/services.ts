import type { HttpEvent, LmError } from "~/types/generics";
import { LmBadRequestError, HttpStatus } from "~/types/generics";
import type { IServiceCreate, IServiceUpdate } from "~/types/services";
import { handleException, setOutputStatus } from "~/server/services/security";
import {
  archiveService,
  createService,
  recoverAllServices,
  recoverServices,
  updateService,
} from "~/server/repositories/services";
import { getAdminListQuery } from "~/server/services/admin";

const routerParam = "serviceId";

export async function addService(event: HttpEvent) {
  const body = await readBody<IServiceCreate>(event);

  try {
    const service = await createService(body);

    setOutputStatus(event, HttpStatus.CREATED);
    return service;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function modifyService(event: HttpEvent) {
  const id = getRouterParam(event, routerParam);
  const body = await readBody<IServiceUpdate>(event);

  if (!id) return handleException(event, new LmBadRequestError("Missing service identifier"));

  try {
    const service = await updateService(Number(id), body);

    setOutputStatus(event, HttpStatus.ACCEPTED);
    return service;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function deleteService(event: HttpEvent) {
  const id = getRouterParam(event, routerParam);
  if (!id) return handleException(event, new LmBadRequestError("Missing service identifier"));

  try {
    const service = await archiveService(Number(id), true);

    setOutputStatus(event, HttpStatus.ACCEPTED);
    return service;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}
export async function restoreService(event: HttpEvent) {
  const id = getRouterParam(event, routerParam);
  if (!id) return handleException(event, new LmBadRequestError("Missing service identifier"));

  try {
    const service = await archiveService(Number(id), false);

    setOutputStatus(event, HttpStatus.ACCEPTED);
    return service;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function recoverDisplayedServices(event: HttpEvent) {
  try {
    return await recoverServices();
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function recoverServicesList(event: HttpEvent) {
  const { limit, offset } = getAdminListQuery(event);

  try {
    const res = await recoverAllServices(limit, offset);

    setOutputStatus(event, res.currentCount === limit && res.totalCount > limit
      ? HttpStatus.PARTIAL_CONTENT
      : HttpStatus.OK);
    return res;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}
