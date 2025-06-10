import { recoverDisplayedServices } from "~/server/services/services";

export default defineEventHandler(async event => await recoverDisplayedServices(event));
