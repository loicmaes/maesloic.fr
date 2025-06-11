interface AdminState {
  key: string | undefined;
  verified: boolean;
  loading: boolean;
}

export const useAdminStore = defineStore("admin", {
  state: (): AdminState => ({
    key: undefined,
    verified: false,
    loading: false,
  }),
  actions: {
    async verifyKey(key?: string) {
      this.loading = true;
      let state = true;

      try {
        const { data } = await useFetch<{
          key: string;
        }>(`/api/admin/security/verify`, {
          headers: useAdminHeaders(key),
        });

        if (!data.value) return;

        this.key = data.value.key;
        this.verified = true;
      }
      catch {
        state = false;
      }
      finally {
        this.loading = false;
      }

      return state;
    },
  },
});
