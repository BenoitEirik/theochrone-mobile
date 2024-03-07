<script lang="ts" setup>
import { Browser } from '@capacitor/browser';

const props = defineProps({
  type: {
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
  },
  link: {
    type: String
  }
})

const toggle = defineModel<boolean>('toggle')

async function action() {
  switch (props.type) {
    case 'toggle':
      toggle.value = !toggle.value
      break;
    case 'link':
      if (props.link) await Browser.open({ url: props.link, toolbarColor: '#55acee' })
      break;
  }
}
</script>

<template>
  <button type="button" class="flex items-stretch w-full justify-stretch" v-wave @click="action">
    <span class="p-4 shrink-0 aspect-video">
      <IconCSS :name="iconName" />
    </span>
    <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
      <span class="line-clamp-2">{{ label }}</span>
    </span>
    <span class="flex items-center justify-center p-4 shrink-0 aspect-video" @click.prevent>
      <x-toggle v-if="type === 'toggle'" v-model="toggle" color="primary" hide-footer />
    </span>
  </button>
</template>
