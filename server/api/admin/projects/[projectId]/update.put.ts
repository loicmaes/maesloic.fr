import { protect } from "~/server/services/security";
import { modifyProject } from "~/server/services/projects";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await modifyProject(req)));
