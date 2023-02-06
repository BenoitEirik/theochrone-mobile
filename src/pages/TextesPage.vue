<template>
<q-page class="q-pa-md full-width column no-wrap items-stretch">
  <div class="q-pb-md text-center">
    Textes fournis par introibo.fr
  </div>

  <q-separator />

  <div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-html="bodyFest" v-show="!loading" />
    </transition>
  </div>

  <q-inner-loading :showing="loading">
    <q-spinner-hourglass size="3em" color="primary" lab />
  </q-inner-loading>
</q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { registerPlugin } from '@capacitor/core';
import { useFestsStore } from 'src/stores/fests-store';

const Bridge = registerPlugin('Bridge');

export default defineComponent({
  name: 'TextesPage',
  setup() {
    const bodyFest = ref<string>('')
    const loading = ref(true)
    const store = useFestsStore()

    onMounted(async () => {
      const response = await Bridge.getFestTextes({ url: store.fests[store.index].massTextURL });
      bodyFest.value = response.data
      loading.value = false
    })

    return {
      bodyFest,
      loading
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
