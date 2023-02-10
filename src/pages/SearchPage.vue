<template>
<q-page>
  <pre>
    {{ searchStore.fests }}
  </pre>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout-store';
import { useSearchStore } from 'src/stores/search-store';

export default defineComponent({
  name: 'SearchPage',
  setup() {
    const layoutStore = useLayoutStore()
    const searchStore = useSearchStore()

    layoutStore.title = 'Recherche'

    return {
      searchStore
    }
  }
})
</script>
