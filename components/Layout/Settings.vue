<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
})
</script>

<template>
  <section class="p-4">
      <h2 class="mb-2 text-lg">{{ title }}</h2>
      <div class="overflow-hidden bg-gray-100 rounded-xl">
        <slot />
      </div>
    </section>
</template>
