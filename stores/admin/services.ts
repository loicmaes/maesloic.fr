import type { IService } from "~/types/services";
import type { AdminListReturn } from "~/types/admin/list";

interface AdminServicesState {
  services: IService[];
  loading: {
    dataUpdate: boolean;
    fetch: boolean;
  };
}

const headers = (key: string): Record<string, string> => ({
  ADMIN_KEY: key,
} as Record<string, string>);

export const useServicesStore = defineStore("services", {
  state: (): AdminServicesState => ({
    services: [],
    loading: {
      dataUpdate: false,
      fetch: false,
    },
  }),
  getters: {},
  actions: {
    async loadServices() {
      const key = useRoute().params.key as string;

      this.loading.fetch = true;

      try {
        const { data } = await useFetch<AdminListReturn<IService>>(`/api/admin/services/list`, {
          headers: headers(key),
        });
        if (!data.value) return;
        this.services = [
          ...this.services,
          ...data.value.data,
        ];
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loading.fetch = false;
      }
    },
  },
});
