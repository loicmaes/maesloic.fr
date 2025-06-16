<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { IWysiwygMedia } from "~/types/wysiwyg";

defineProps<{
  media: IWysiwygMedia;
}>();
const classes: HTMLAttributes["class"] = "rounded-lg";
</script>

<template>
  <NuxtImg
    v-if="media.type === 'image'"
    :src="media.data.url"
    :class="classes"
  />
  <video
    v-if="media.type === 'video'"
    :src="media.data.url"
    :class="classes"
    controls
  />
</template>
