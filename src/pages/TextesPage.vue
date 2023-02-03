<template>
<q-page class="q-pa-md full-width column no-wrap justify-between items-stretch">
  <div v-html="bodyFest" />
</q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { registerPlugin } from '@capacitor/core';

const Bridge = registerPlugin('Bridge');

export default defineComponent({
  name: 'TextesPage',
  setup() {
    const headerFest = ref<string>('')
    const bodyFest = ref<string>('')

    onMounted(async () => {
      const response = await Bridge.getFestTextes({ url: useRoute().query.url });
      bodyFest.value = response.data
    })

    return {
      headerFest,
      bodyFest
    }
  }
})
</script>

<style>
* {
  hyphens: auto;
}

p:first-child {
  display: none;
}

h3,
h3 * {
  padding: 0;
  margin: 10px;
  font-size: 20px;
  color: black;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
}

a {
  text-decoration: none;
}

table {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 20px;
}

table:first-of-type {
  width: 100%;
  border: 1px solid lightgrey;
}
</style>
