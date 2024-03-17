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
  },
  selectOptions: {
    type: Array
  }
})
const _options = props.selectOptions as SelectOptionsSetting[]

interface SelectOptionsSetting {
  value: string;
  label: string;
}

const toggle = defineModel<boolean>('toggle')
const select = defineModel<string>('select')

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
    <span class="flex items-center justify-center p-4 shrink-0 aspect-video">
      <IconCSS :name="iconName" />
    </span>
    <span class="flex flex-col items-stretch justify-center p-2 font-medium text-left grow text-secondary-800">
      <span class="line-clamp-1">{{ label }}</span>
    </span>
    <span v-if="type === 'toggle'" class="flex items-center justify-center p-4 shrink-0 aspect-video" @click.prevent>
      <x-toggle v-model="toggle" color="primary" hide-footer />
    </span>
    <span v-else-if="type === 'link'" class="flex items-center justify-center p-4 shrink-0 aspect-video" @click.prevent>
      <IconCSS name="lets-icons:external" />
    </span>
    <span id="select" v-else-if="type === 'select'" class="flex items-center justify-center pr-4 shrink-0"
      @click.prevent>
      <x-select v-model="select" :options="_options" :hide-footer="true" :flat="true" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
#select {
  .x-select {
    .v-popper {
      div {
        border-radius: 9999px !important;
      }
    }
  }
}
</style>
