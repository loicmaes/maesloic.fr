import { protect } from "~/server/services/security";
import { addProject } from "~/server/services/projects";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await addProject(req)));
