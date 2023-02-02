<template>
<q-page class="q-pa-md row items-start justify-evenly">
  <q-img :src="fest.img || '~assets/images/image_not_found.png'" fit="contain" class="q-mb-md" />

  <q-list bordered separator style="background: #fafafa;">
    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Propre</q-item-section>
      <q-item-section>{{ fest.proper }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Édition</q-item-section>
      <q-item-section>{{ fest.edition }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Célébration</q-item-section>
      <q-item-section>{{ fest.celebration }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Classe</q-item-section>
      <q-item-section>{{ fest.class }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Couleur liturgique</q-item-section>
      <q-item-section>{{ fest.color }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Temporal</q-item-section>
      <q-item-section>{{ fest.temporal }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Sanctoral</q-item-section>
      <q-item-section>{{ fest.sanctoral }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Temps liturgique</q-item-section>
      <q-item-section>{{ fest.liturgicalTime }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Fête transférée</q-item-section>
      <q-item-section>{{ fest.transferedFest }}</q-item-section>
    </q-item>
  </q-list>

  <q-btn no-caps flat padding="md" class="full-width text-underline" color="primary"
    style="text-decoration: underline; background: #f5f5f5;"
    @click="$router.push({ path: '/textes', query: { title: fest.title, url: fest.massTextURL } })">Textes
    de la
    messe et de l'office</q-btn>
</q-page>
</template>

<script lang="ts">
import { Fest } from 'src/assets/js/models';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'FestPage',
  setup() {
    var fest: Fest = JSON.parse(useRoute().query.data?.toString() || '') as Fest

    return {
      fest
    }
  }
});
</script>
