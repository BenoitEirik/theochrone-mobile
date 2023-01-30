<template>
<q-page class="q-pa-md full-width column no-wrap justify-between items-stretch">
  <div v-html="bodyFest" />
</q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Http } from '../../src-capacitor/node_modules/@capacitor-community/http';

export default defineComponent({
  name: 'TextesPage',
  setup() {
    const headerFest = ref<string>('')
    const bodyFest = ref<string>('')

    onMounted(async () => {
      const response = await Http.get({ url: 'https://introibo.fr/04-02-St-Andre-Corsini-eveque-et' });

      const body = new DOMParser().parseFromString(
        response.data,
        'text/html',
      ).body;

      bodyFest.value = body.querySelector('#principal .texte')?.innerHTML || ''
    })

    return {
      headerFest,
      bodyFest
    }
  }
})
</script>
