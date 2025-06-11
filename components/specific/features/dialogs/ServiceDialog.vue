<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useForm } from "vee-validate";
import { Save, Plus, LoaderCircle } from "lucide-vue-next";
import { useVirtualList } from "@vueuse/core";
import type { IService, IServiceCreate, IServiceUpdate } from "~/types/services";
import Icon from "~/components/shared/icons/Icon.vue";

const { locale, availableLocales } = useI18n();
const selectedLanguage = ref<string>(locale.value);
const icons = useAvailableIcons();

const open = defineModel<boolean>("open");
watch(open, (val) => {
  setTimeout(() => {
    if (!editMode.value) return;

    if (val) form.validate();
    else form.resetForm();
  }, 10);
});

const props = withDefaults(defineProps<{
  service?: IService;
  withSlot?: boolean;
}>(), {
  withSlot: false,
});
const editMode = computed((): boolean => !!props.service);

const schema = toTypedSchema(z.object({
  icon: z.string(),
  title: useTranslations(),
  caption: useTranslations(),
  displayed: z.boolean().optional(),
}));
const form = useForm({
  validationSchema: schema,
  initialValues: {
    icon: props.service ? props.service.icon : icons[0],
    title: props.service ? { ...props.service.title } : undefined,
    caption: props.service ? { ...props.service.caption } : undefined,
    displayed: props.service?.displayed ?? false,
  },
});
const submit = form.handleSubmit(async (values) => {
  if (editMode.value) await saveService(values);
  else await createService({ ...values, icon: "Home", displayed: values.displayed ?? false });
});

const store = useServicesStore();
async function saveService(data: IServiceUpdate) {
  if (!props.service) return;

  const keepOpen = await store.editService(props.service.id, data);
  open.value = !keepOpen;
}
async function createService(data: IServiceCreate) {
  if (props.service) return;

  const keepOpen = await store.createService(data);
  open.value = !keepOpen;
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger
      v-if="withSlot"
      as-child
    >
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader v-if="!editMode">
        <DialogTitle>{{ $t("admin.services.dialog.new-title") }}</DialogTitle>
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

        <FormField
          v-slot="{ value, componentField }"
          name="icon"
        >
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl v-bind="componentField">
              <Select>
                <SelectTrigger class="w-full">
                  <Icon :name="value" />
                  <SelectValue class="flex-1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="icon in icons"
                    :key="icon"
                    :value="icon"
                  >
                    <Icon :name="icon" />
                    {{ icon }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>
        <FormField name="title">
          <FormItem>
            <FormLabel>{{ $t("admin.services.dialog.form.title") }}</FormLabel>

            <FormField
              v-slot="{ componentField }"
              :name="`title.${selectedLanguage}`"
            >
              <FormItem>
                <FormControl v-bind="componentField">
                  <Input
                    placeholder="Titre du service"
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
            <FormLabel>{{ $t("admin.services.dialog.form.caption") }}</FormLabel>

            <FormField
              v-slot="{ componentField }"
              :name="`caption.${selectedLanguage}`"
            >
              <FormItem>
                <FormControl v-bind="componentField">
                  <Input
                    placeholder="Description du service"
                    :disabled="store.dataUpdating"
                  />
                </FormControl>
              </FormItem>
            </FormField>

            <FormMessage />
          </FormItem>
        </FormField>

        <Separator />

        <FormField
          v-slot="{ value, handleChange }"
          name="displayed"
        >
          <FormItem class="flex items-center justify-between">
            <div class="grid gap-1">
              <FormLabel>{{ $t("admin.services.dialog.form.display.label") }}</FormLabel>
              <FormDescription>{{ $t("admin.services.dialog.form.display.caption") }}</FormDescription>
            </div>

            <FormControl>
              <Switch
                :model-value="value"
                :disabled="store.dataUpdating"
                @update:model-value="handleChange"
              />
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
            <template v-else>
              <Save v-if="editMode" />
              <Plus v-else />
            </template>
            {{ $t(`btn.${editMode ? "save" : "add"}`) }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
