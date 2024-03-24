<script lang="ts" setup>
const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
useBackButton().setBack()

const store = useMartyrologeStore()
navStore.setTitle(store.martyrologeFest?.hrDate || '')
</script>

<template>
  <nuxtLayout name="main" class="flex flex-col items-stretch gap-4 p-4 overflow-y-auto">
    <section id="martyrologe_container" v-html="store.martyrologeFest?.blockquote"
      class="flex flex-col gap-4 p-4 shadow-inner rounded-3xl bg-secondary-50 [&_mark]:bg-primary-200 [&_mark]:rounded [&_mark]:px-1" />
  </nuxtLayout>
</template>
