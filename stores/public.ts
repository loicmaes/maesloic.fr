import type { IService } from "~/types/services";

interface PublicStore {
  // Services
  services: IService[];
  loadingServices: boolean;
  // Projects
  projects: [];
  // Testimonials
  testimonials: [];
}

export const usePublicStore = defineStore("public", {
  state: (): PublicStore => ({
    services: [],
    loadingServices: false,
    projects: [],
    testimonials: [],
  }),
  getters: {},
  actions: {
    async loadServices() {
      this.loadingServices = true;

      try {
        const { data } = await useFetch<IService[]>("/api/services");
        if (!data.value) return;

        this.services = data.value;
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loadingServices = false;
      }
    },
  },
});
