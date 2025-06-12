import { protect } from "~/server/services/security";
import { recoverAdminProjectsList } from "~/server/services/projects";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await recoverAdminProjectsList(req)));
