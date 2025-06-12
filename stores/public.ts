import type { IService } from "~/types/services";
import type { TArray } from "~/types/generics";
import type { IProject } from "~/types/projects";

interface PublicStore {
  // Services
  services: TArray<IService>;
  loadingServices: boolean;
  // Projects
  projects: TArray<IProject>;
  loadingProjects: boolean;
  // Testimonials
  testimonials: [];
}

export const usePublicStore = defineStore("public", {
  state: (): PublicStore => ({
    services: [],
    loadingServices: false,
    projects: [],
    loadingProjects: false,
    testimonials: [],
  }),
  getters: {},
  actions: {
    async loadServices() {
      this.loadingServices = true;

      try {
        const { data } = await useFetch<TArray<IService>>("/api/services");
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
    async loadProjects() {
      this.loadingProjects = true;

      try {
        const { data } = await useFetch<TArray<IProject>>("/api/projects");
        if (!data.value) return;

        this.projects = data.value;
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loadingProjects = false;
      }
    },
  },
});
