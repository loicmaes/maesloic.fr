import type { ColumnDef } from "@tanstack/vue-table";
import type { IProject } from "~/types/projects";
import { Badge } from "~/components/ui/badge";
import ProjectsTableActions from "~/components/specific/projects/table/ProjectsTableActions.vue";

export const columns = (): ColumnDef<IProject>[] => {
  const { locale, t } = useNuxtApp().$i18n;

  return [
    {
      id: "id",
      enableHiding: false,
      cell: ({ row }) => h("div", { class: "text-muted-foreground" }, `${row.original.id}`),
    },
    {
      id: "title",
      header: () => h("div", t("admin.projects.table.headers.title")),
      cell: ({ row }) => h("div", row.original.title[locale.value]),
    },
    {
      id: "caption",
      header: () => h("div", t("admin.projects.table.headers.caption")),
      cell: ({ row }) => h("div", { class: "text-muted-foreground" }, row.original.caption[locale.value]),
    },
    {
      id: "state",
      header: () => h("div", t("admin.projects.table.headers.status")),
      cell: ({ row }) => {
        if (row.original.archivedAt) return h("div", h(Badge, { variant: "destructive" }, t("labels.archived", 1)));
        return h("div", h(Badge, { variant: row.original.draft ? "outline" : "secondary" }, t(`labels.${row.original.draft ? "draft" : "published"}`)));
      },
    },
    {
      id: "last-update",
      header: () => h("div", t("admin.projects.table.headers.last-update")),
      cell: ({ row }) => h("div", { class: "text-muted-foreground" }, Intl.DateTimeFormat(locale.value, {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(row.original.updatedAt))),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => h("div", { class: "flex justify-end" }, h(ProjectsTableActions, { project: row.original })),
    },
  ];
};
