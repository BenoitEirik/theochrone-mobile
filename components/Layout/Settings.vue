<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="p-4">
    <h2 class="mb-3 text-lg">{{ title }}</h2>
    <div class="overflow-hidden divide-y divide-white shadow-inner rounded-3xl bg-gray-50">
      <slot />
    </div>
  </section>
</template>
