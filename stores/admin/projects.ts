import { toast } from "vue-sonner";
import type { TArray, TNullable } from "~/types/generics";
import type { IProject, IProjectCreate, IProjectUpdate } from "~/types/projects";
import type { AdminListReturn } from "~/types/admin/list";

interface ProjectsState {
  projects: TArray<IProject>;
  selectedProject: TNullable<IProject>;
  loading: {
    dataUpdate: boolean;
    fetch: boolean;
  };
}

export const useProjectsStore = defineStore("projects", {
  state: (): ProjectsState => ({
    projects: [],
    selectedProject: null,
    loading: {
      dataUpdate: false,
      fetch: false,
    },
  }),
  getters: {
    sortedProjects: state => state.projects.sort((a, b) => a.id - b.id),
    dataUpdating: state => state.loading.dataUpdate,
    translate: () => useNuxtApp().$i18n.t,
  },
  actions: {
    async loadProjects() {
      this.loading.fetch = true;

      try {
        const { data } = await useFetch<AdminListReturn<IProject>>("/api/admin/projects", {
          headers: useAdminHeaders(),
        });
        if (!data.value) return;
        this.projects = data.value.data;
      }
      catch (e) {
        console.error(e);
      }
      finally {
        this.loading.fetch = false;
      }
    },
    async createProject(data: IProjectCreate) {
      this.loading.dataUpdate = true;
      let state = true;

      try {
        const project = await $fetch<IProject>("/api/admin/projects/create", {
          method: "POST",
          headers: useAdminHeaders(),
          body: data,
        });

        this.projects = [...this.projects, project];
        this.selectedProject = project;
      }
      catch {
        toast.error("");
        state = false;
      }
      finally {
        this.loading.dataUpdate = false;
      }

      return state;
    },
    async updateProject(id: number, data: IProjectUpdate) {
      this.loading.dataUpdate = true;
      let state = true;

      try {
        const project = await $fetch<IProject>(`/api/admin/projects/${id}/update`, {
          method: "PUT",
          headers: useAdminHeaders(),
          body: data,
        }).finally(() => this.loading.dataUpdate = false);

        this.projects = this.projects.map(p => p.id === project.id ? project : p);
        if (this.selectedProject?.id === project.id) this.selectedProject = project;
      }
      catch {
        toast.error("");
        state = false;
      }
      finally {
        this.loading.dataUpdate = false;
      }

      return state;
    },
    async archiveProject(id: number) {
      toast.promise($fetch<IProject>(`/api/admin/projects/${id}/archive`, {
        method: "DELETE",
        headers: useAdminHeaders(),
      }), {
        loading: "Archiving...",
        success: (project: IProject) => {
          this.projects = this.projects.map(p => p.id === project.id ? project : p);
          return "Archived!";
        },
        error: () => "Error!",
      });
    },
    async restoreProject(id: number) {
      toast.promise($fetch<IProject>(`/api/admin/projects/${id}/restore`, {
        method: "PATCH",
        headers: useAdminHeaders(),
      }), {
        loading: "Restoring...",
        success: (project: IProject) => {
          this.projects = this.projects.map(p => p.id === project.id ? project : p);
          return "Restored!";
        },
        error: () => "Error!",
      });
    },
    async selectProject(id: number) {
      if (this.selectedProject?.id === id) return true;

      try {
        const { data } = await useFetch<IProject>(`/api/admin/projects/${id}`, {
          headers: useAdminHeaders(),
        });
        if (!data.value) return false;

        this.selectedProject = data.value;
        return true;
      }
      catch {
        toast.error("Error!");
        return false;
      }
    },
    // utils
    async convertToDraft(id: number) {
      toast.promise($fetch<IProject>(`/api/admin/projects/${id}/update`, {
        method: "PUT",
        headers: useAdminHeaders(),
        body: {
          draft: true,
        },
      }), {
        loading: "Converting to draft...",
        success: (project: IProject) => {
          this.projects = this.projects.map(p => p.id === project.id ? project : p);
          if (this.selectedProject?.id === project.id) this.selectedProject = project;
          return "Saved to drafts!";
        },
        error: () => "Error!",
      });
    },
    async publish(id: number) {
      toast.promise($fetch<IProject>(`/api/admin/projects/${id}/update`, {
        method: "PUT",
        headers: useAdminHeaders(),
        body: {
          draft: false,
        },
      }), {
        loading: "Publishing...",
        success: (project: IProject) => {
          this.projects = this.projects.map(p => p.id === project.id ? project : p);
          if (this.selectedProject?.id === project.id) this.selectedProject = project;
          return "Published!";
        },
        error: () => "Error!",
      });
    },
  },
});
