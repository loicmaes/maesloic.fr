import { protect } from "~/server/services/security";

export default defineEventHandler(async event =>
  await protect(event, async req => ({
    key: req.context.key,
  })));
