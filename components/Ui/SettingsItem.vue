<script lang="ts" setup>
const props = defineProps({
  rightActionType: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  iconName: {
    type: String,
    required: true
  }
})

const model = defineModel<boolean>()
</script>

<template>
  <button type="button" class="flex items-stretch w-full justify-stretch" v-wave @click="model = !model">
    <span class="p-4 shrink-0 aspect-video">
      <Icon :name="iconName" />
    </span>
    <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
      <p class="line-clamp-2">{{ label }}</p>
    </span>
    <span class="flex items-center justify-center p-4 shrink-0 aspect-video" @click.prevent>
      <x-toggle v-if="rightActionType === 'boolean'" v-model="model" color="primary" hide-footer />
    </span>
  </button>
</template>
