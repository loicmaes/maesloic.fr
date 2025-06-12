<script setup lang="ts">
import { MoreVertical, CircleDashed, CloudUpload, Pen, Archive, ArchiveRestore, Trash, Eye } from "lucide-vue-next";
import type { IProject } from "~/types/projects";
import ProjectDialog from "~/components/specific/projects/dialogs/ProjectDialog.vue";

const props = defineProps<{
  project: IProject;
}>();

const store = useProjectsStore();

const editOpen = ref<boolean>(false);

function handlePublicChanges() {
  if (props.project.draft) store.publish(props.project.id);
  else store.convertToDraft(props.project.id);
}
const archive = () => store.archiveProject(props.project.id);
const restore = () => store.restoreProject(props.project.id);
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          size="icon"
          variant="ghost"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <template v-if="!project.archivedAt">
          <DropdownMenuGroup v-if="project.draft">
            <DropdownMenuItem @click="editOpen = true">
              <Pen />
              {{ $t("btn.edit") }}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Eye />
              {{ $t("btn.preview") }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup v-else>
            <DropdownMenuItem>
              <Eye />
              {{ $t("admin.projects.btn.see-project") }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="handlePublicChanges">
              <CloudUpload v-if="project.draft" />
              <CircleDashed v-else />

              {{ $t(`btn.${project.draft ? "publish" : "convert-to-draft"}`) }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="archive">
              <Archive />
              {{ $t("btn.archive") }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </template>
        <DropdownMenuGroup v-else>
          <DropdownMenuItem @click="restore">
            <ArchiveRestore />
            {{ $t("btn.restore") }}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled
          >
            <Trash />
            {{ $t("btn.permanently-delete") }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

    <ProjectDialog
      v-model:open="editOpen"
      :project="project"
    />
  </div>
</template>
