<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Plus, LoaderCircle } from "lucide-vue-next";
import { z } from "zod";
import { useForm } from "vee-validate";
import type { IProject, IProjectCreate, IProjectUpdate } from "~/types/projects";

const props = withDefaults(defineProps<{
  withSlot?: boolean;
  project?: IProject;
}>(), {
  withSlot: false,
});
const editMode = computed(() => !!props.project);

const { locale, availableLocales } = useI18n();
const selectedLanguage = ref<string>(locale.value);

const open = defineModel<boolean>("open");
watch(open, (val) => {
  if (!editMode.value) return;

  form.resetForm();
  setTimeout(() => {
    if (val) form.validate();
    else form.resetForm();
  }, 10);
});

const schema = toTypedSchema(z.object({
  title: useTranslations(),
  caption: useTranslations(),
  tags: z.array(z.string()).min(0),
}));
const form = useForm({
  validationSchema: schema,
  initialValues: {
    title: props.project ? { ...props.project?.title } : undefined,
    caption: props.project ? { ...props.project?.caption } : undefined,
    tags: [...props.project?.tags ?? []],
  },
});
const submit = form.handleSubmit(async (values) => {
  const keepOpen = editMode.value
    ? await save(values)
    : await create({
        ...values,
        content: {
          options: {
            fullWidth: false,
          },
          blocks: [],
        },
      });
  open.value = !keepOpen;
});

const store = useProjectsStore();
async function save(data: IProjectUpdate) {
  if (!props.project) return;
  return await store.updateProject(props.project.id, data);
}
async function create(data: IProjectCreate) {
  if (props.project) return;
  return await store.createProject(data);
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ project?.title[locale] ?? $t("admin.projects.dialog.new-title") }}</DialogTitle>
      </DialogHeader>

      <form
        class="grid gap-4"
        @submit="submit"
      >
        <header
          v-if="availableLocales.length > 1"
          class="flex items-center gap-1"
        >
          <Button
            v-for="lang in availableLocales"
            :key="`tab-${lang}`"
            type="button"
            size="sm"
            class="flex-1"
            :variant="selectedLanguage === lang ? 'secondary' : 'outline'"
            @click="selectedLanguage = lang"
          >
            {{ $t(`labels.languages.${lang}`) }}
          </Button>
        </header>

        <FormField name="title">
          <FormItem>
            <FormLabel>{{ $t("admin.projects.dialog.form.title") }}</FormLabel>

            <FormField
              v-slot="{ componentField }"
              :name="`title.${selectedLanguage}`"
            >
              <FormItem>
                <FormControl v-bind="componentField">
                  <Input
                    placeholder="Titre du projet"
                    :disabled="store.dataUpdating"
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="caption">
          <FormItem>
            <FormLabel>{{ $t("admin.projects.dialog.form.caption") }}</FormLabel>

            <FormField
              v-slot="{ componentField }"
              :name="`caption.${selectedLanguage}`"
            >
              <FormItem>
                <FormControl v-bind="componentField">
                  <Input
                    placeholder="Description du projet"
                    :disabled="store.dataUpdating"
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="tags"
        >
          <FormItem>
            <FormLabel>{{ $t("admin.projects.dialog.form.tags") }}</FormLabel>
            <FormControl>
              <TagsInput
                :disabled="store.dataUpdating"
                :model-value="componentField.modelValue"
                @update:model-value="componentField['onUpdate:modelValue']"
              >
                <TagsInputItem
                  v-for="item in componentField.modelValue"
                  :key="item"
                  :value="item"
                >
                  <TagsInputItemText />
                  <TagsInputItemDelete />
                </TagsInputItem>

                <TagsInputInput placeholder="Tags..." />
              </TagsInput>
            </FormControl>
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button
            type="submit"
            :disabled="store.dataUpdating"
          >
            <LoaderCircle
              v-if="store.dataUpdating"
              class="animate-spin"
            />
            <Plus v-else />
            {{ $t("btn.add") }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
