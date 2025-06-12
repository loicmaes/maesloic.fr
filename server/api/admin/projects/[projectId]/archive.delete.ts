import { protect } from "~/server/services/security";
import { changeProjectArchiveState } from "~/server/services/projects";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await changeProjectArchiveState(req, true)));
