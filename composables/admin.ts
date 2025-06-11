export const useAdminHeaders = (key?: string): Record<string, string> =>
  ({
    ADMIN_KEY: key ?? useRoute().params.key as string,
  } as Record<string, string>);
