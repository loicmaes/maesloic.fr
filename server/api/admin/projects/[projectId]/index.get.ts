import { protect } from "~/server/services/security";
import { recoverProject } from "~/server/services/projects";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await recoverProject(req)));
