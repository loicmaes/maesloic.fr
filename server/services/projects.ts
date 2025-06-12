import type { HttpEvent, LmError } from "~/types/generics";
import { LmBadRequestError, HttpStatus } from "~/types/generics";
import { handleException, setOutputStatus } from "~/server/services/security";
import type { IProjectCreate, IProjectUpdate } from "~/types/projects";
import {
  archiveProject,
  createProject,
  getAllProjects, getProject,
  getPublishedProjects,
  updateProject,
} from "~/server/repositories/projects";
import { getAdminListQuery } from "~/server/services/admin";

export async function addProject(event: HttpEvent) {
  const body = await readBody<IProjectCreate>(event);

  try {
    const project = await createProject(body);
    setOutputStatus(event, HttpStatus.CREATED);
    return project;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function modifyProject(event: HttpEvent) {
  const id = getRouterParam(event, "projectId");
  if (!id) return handleException(event, new LmBadRequestError("Missing project id!"));
  const body = await readBody<IProjectUpdate>(event);

  try {
    const project = await updateProject(Number(id), body);
    setOutputStatus(event, HttpStatus.ACCEPTED);
    return project;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function changeProjectArchiveState(event: HttpEvent, data: boolean) {
  const id = getRouterParam(event, "projectId");
  if (!id) return handleException(event, new LmBadRequestError("Missing project id!"));

  try {
    const project = await archiveProject(Number(id), data);
    setOutputStatus(event, HttpStatus.ACCEPTED);
    return project;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function recoverPublicProjectsList(event: HttpEvent) {
  try {
    return await getPublishedProjects();
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function recoverAdminProjectsList(event: HttpEvent) {
  const query = getAdminListQuery(event);

  try {
    const projects = await getAllProjects(query);
    setOutputStatus(event, projects.currentCount < projects.totalCount
      ? HttpStatus.PARTIAL_CONTENT
      : HttpStatus.OK);
    return projects;
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}

export async function recoverProject(event: HttpEvent) {
  const id = getRouterParam(event, "projectId");
  if (!id) return handleException(event, new LmBadRequestError("Missing project id!"));

  try {
    return await getProject(Number(id), !!event.context.key);
  }
  catch (e) {
    return handleException(event, e as LmError);
  }
}
