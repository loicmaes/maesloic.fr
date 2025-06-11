<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { LoaderCircle } from "lucide-vue-next";

const { t } = useI18n();

definePageMeta({
  layout: "empty",
});

const store = useAdminStore();
const { loading } = storeToRefs(store);

const schema = toTypedSchema(z.object({
  key: z.string().length(32),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async ({ key }) => {
  if (!await store.verifyKey(key)) return toast.error(t("toasters.error.internal"));

  navigateTo(useLocalePath()(`/admin/${key}`));
});
</script>

<template>
  <main
    data-page="admin.login"
    class="min-h-dvh w-full grid place-items-center p-4"
  >
    <Card class="max-w-sm w-full">
      <CardHeader>
        <CardTitle>Entre ta clé d'API</CardTitle>
      </CardHeader>

      <form
        class="grid gap-4"
        @submit="submit"
      >
        <CardContent>
          <FormField
            v-slot="{ componentField }"
            name="key"
          >
            <FormItem>
              <FormLabel>Clé d'API</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  placeholder="api key"
                  :disabled="loading"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </CardContent>

        <CardFooter class="justify-end">
          <Button
            type="submit"
            :disabled="loading"
          >
            <LoaderCircle
              v-if="loading"
              class="animate-spin"
            />
            {{ loading ? "Vérification..." : "Vérifier" }}
          </Button>
        </CardFooter>
      </form>
    </Card>
  </main>
</template>
