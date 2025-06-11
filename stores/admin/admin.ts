interface AdminState {
  key: string | undefined;
  verified: boolean;
}

export const useAdminStore = defineStore("admin", {
  state: (): AdminState => ({
    key: undefined,
    verified: false,
  }),
  actions: {
    async verifyKey(key?: string) {
      try {
        const { data } = await useFetch<{
          key: string;
        }>(`/api/admin/security/verify`, {
          headers: useAdminHeaders(key),
        });

        if (!data.value) return;

        this.key = data.value.key;
        this.verified = true;
        return true;
      }
      catch {
        return false;
      }
    },
  },
});
