<script setup lang="ts">
import { Trash, MoreVertical, EyeClosed, Eye, Pen, Archive, ArchiveRestore } from "lucide-vue-next";
import type { IService } from "~/types/services";
import ServiceDialog from "~/components/specific/features/dialogs/ServiceDialog.vue";

defineProps<{
  service: IService;
}>();

const store = useServicesStore();

const { open: editDialog } = useDialog();
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="icon"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <template v-if="!service.archivedAt">
          <DropdownMenuGroup>
            <DropdownMenuItem @click="editDialog = true">
              <Pen />
              {{ $t("admin.services.table.actions.edit") }}
            </DropdownMenuItem>
            <DropdownMenuItem @click="store.updateVisibility(service.id, !service.displayed)">
              <template v-if="service.displayed">
                <EyeClosed />
                {{ $t("admin.services.table.actions.hide") }}
              </template>
              <template v-else>
                <Eye />
                {{ $t("admin.services.table.actions.display") }}
              </template>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="store.archive(service.id)">
              <Archive />
              {{ $t("admin.services.table.actions.archive") }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </template>
        <DropdownMenuGroup v-else>
          <DropdownMenuItem @click="store.restore(service.id)">
            <ArchiveRestore />
            {{ $t("admin.services.table.actions.restore") }}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled
          >
            <Trash />
            {{ $t("admin.services.table.actions.permanently-delete") }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

    <ServiceDialog
      v-model:open="editDialog"
      :service="service"
    />
  </div>
</template>
