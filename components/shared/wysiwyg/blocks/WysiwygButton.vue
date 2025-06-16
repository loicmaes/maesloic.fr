<script setup lang="ts">
import type { IWysiwygButton } from "~/types/wysiwyg";
import Icon from "~/components/shared/icons/Icon.vue";

defineProps<{
  button: IWysiwygButton;
}>();
</script>

<template>
  <Button
    :class="{
      'self-start': button.side === 'left',
      'self-end': button.side === 'right',
      'self-center': button.side === 'center',
    }"
    :variant="button.variant"
    as-child
  >
    <NuxtLink
      :to="button.url"
      :target="button.target"
    >
      <Icon
        v-if="button.icon && button.icon.side === 'left'"
        :name="button.icon.name"
      />
      {{ button.label }}
      <Icon
        v-if="button.icon && button.icon.side === 'right'"
        :name="button.icon.name"
      />
    </NuxtLink>
  </Button>
</template>
