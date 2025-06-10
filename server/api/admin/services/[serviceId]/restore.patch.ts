import { restoreService } from "~/server/services/services";
import { protect } from "~/server/services/security";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await restoreService(req)));
