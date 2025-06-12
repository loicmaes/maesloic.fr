import { toast } from "vue-sonner";
import type { IService, IServiceCreate, IServiceUpdate } from "~/types/services";
import type { AdminListReturn } from "~/types/admin/list";
import type { TArray } from "~/types/generics";

interface AdminServicesState {
  services: TArray<IService>;
  loading: {
    dataUpdate: boolean;
    fetch: boolean;
  };
}

export const useServicesStore = defineStore("services", {
  state: (): AdminServicesState => ({
    services: [],
    loading: {
      dataUpdate: false,
      fetch: false,
    },
  }),
  getters: {
    sortedServices: state => state.services.sort((a, b) => a.id - b.id),
    translate: () => useNuxtApp().$i18n.t,
    dataUpdating: state => state.loading.dataUpdate,
  },
  actions: {
    async loadServices() {
      this.loading.fetch = true;

      try {
        const { data } = await useFetch<AdminListReturn<IService>>(`/api/admin/services/list`, {
          headers: useAdminHeaders(),
        });
        if (!data.value) return;
        this.services = data.value.data;
      }
      catch {
        toast.error(this.translate("toasters.error.internal"));
      }
      finally {
        this.loading.fetch = false;
      }
    },
    async createService(data: IServiceCreate) {
      this.loading.dataUpdate = true;
      let state = true;

      try {
        const service = await $fetch<IService>("/api/admin/services/create", {
          method: "POST",
          headers: useAdminHeaders(),
          body: data,
        });

        this.services = [...this.services, service];
        toast.success(this.translate("admin.services.toasters.created", { id: service.id }));
      }
      catch {
        toast.error(this.translate("toasters.error.internal"));
        state = false;
      }
      finally {
        this.loading.dataUpdate = false;
      }

      return state;
    },
    async editService(id: number, data: IServiceUpdate) {
      this.loading.dataUpdate = true;
      let state = true;

      try {
        const service = await $fetch<IService>(`/api/admin/services/${id}/update`, {
          method: "PUT",
          headers: useAdminHeaders(),
          body: data,
        });

        const mapped = this.services.map(s => s.id === service.id ? { ...service } : s);
        this.services = mapped.sort((a, b) => a.id - b.id);
        toast.success(this.translate("admin.services.toasters.saved", { id: service.id }));
      }
      catch {
        toast.error(this.translate("toasters.error.internal"));
        state = false;
      }
      finally {
        this.loading.dataUpdate = false;
      }

      return state;
    },
    async updateVisibility(id: number, displayed: boolean) {
      toast.promise($fetch<IService>(`/api/admin/services/${id}/update`, {
        method: "PUT",
        headers: useAdminHeaders(),
        body: {
          displayed,
        },
      }), {
        loading: this.translate("labels.in-progress.saving"),
        success: (service: IService) => {
          this.services = this.services.map(s => s.id === service.id ? service : s);
          return this.translate(`admin.services.toasters.became-${service.displayed ? "visible" : "invisible"}`, { id: service.id });
        },
        error: () => this.translate("toasters.error.internal"),
      });
    },
    async archive(id: number) {
      toast.promise($fetch<IService>(`/api/admin/services/${id}/archive`, {
        method: "DELETE",
        headers: useAdminHeaders(),
      }), {
        loading: this.translate("toasters.in-progress.archiving"),
        success: (service: IService) => {
          this.services = this.services.map(s => s.id === service.id ? service : s);
          return this.translate("toasters.success.archive");
        },
        error: () => this.translate("toasters.error.internal"),
      });
    },
    async restore(id: number) {
      toast.promise($fetch<IService>(`/api/admin/services/${id}/restore`, {
        method: "PATCH",
        headers: useAdminHeaders(),
      }), {
        loading: this.translate("toasters.in-progress.restoring"),
        success: (service: IService) => {
          this.services = this.services.map(s => s.id === service.id ? service : s);
          return this.translate("toasters.success.restore");
        },
        error: () => this.translate("toasters.error.internal"),
      });
    },
  },
});
