import type { ColumnDef } from "@tanstack/vue-table";
import FeaturedTableAction from "./FeaturesTableAction.vue";
import type { IService } from "~/types/services";
import Icon from "~/components/shared/icons/Icon.vue";
import { Badge } from "~/components/ui/badge";

export const columns = (): ColumnDef<IService>[] => {
  const { locale, t } = useNuxtApp().$i18n;
  const lang = locale.value;

  return [
    {
      id: "icon",
      cell: ({ row }) => h("div", h(Icon, { name: row.original.icon })),
    },
    {
      accessorKey: "title",
      header: () => h("div", t("admin.services.table.headers.title")),
      cell: ({ row }) => h("div", {}, row.original.title[lang]),
    },
    {
      accessorKey: "caption",
      header: () => h("div", t("admin.services.table.headers.caption")),
      cell: ({ row }) => h("div", { class: "overflow-hidden text-muted-foreground" }, h("p", { class: "truncate" }, row.original.caption[lang])),
    },
    {
      accessorKey: "displayed",
      header: () => h("div", t("admin.services.table.headers.status")),
      cell: ({ row }) => {
        const archived = !!row.original.archivedAt;
        const displayed = row.original.displayed;

        let child;

        if (archived) child = h(Badge, { variant: "destructive" }, t("labels.archived", 1));
        else child = h(Badge, { variant: displayed ? "default" : "outline" }, t(`labels.${displayed ? "displayed" : "hidden"}`, 1));

        return h("div", child);
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => h("div", { class: "inline-flex items-center justify-end" }, h(FeaturedTableAction, { service: row.original })),
    },
  ];
};
