import { recoverPublicProjectsList } from "~/server/services/projects";

export default defineEventHandler(async event =>
  await recoverPublicProjectsList(event));
