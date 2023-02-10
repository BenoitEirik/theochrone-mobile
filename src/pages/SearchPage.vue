<template>
<q-page>
  test
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout-store';

export default defineComponent({
  name: 'SearchPage',
  setup() {
    const layoutStore = useLayoutStore()

    layoutStore.title = 'Recherche'

    return {

    }
  }
})
</script>
