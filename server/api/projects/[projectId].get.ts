import { recoverProject } from "~/server/services/projects";

export default defineEventHandler(async event =>
  await recoverProject(event));
