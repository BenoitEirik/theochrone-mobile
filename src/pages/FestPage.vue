<template>
<q-page class="q-pa-md row items-start justify-evenly">
  <q-img src="~assets/images/image_not_found.png" fit="fill" />

  <q-list bordered separator>
    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Propre</q-item-section>
      <q-item-section>Romain</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Édition</q-item-section>
      <q-item-section>1962</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Célébration</q-item-section>
      <q-item-section>Cette fête peut être célébrée.</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Classe</q-item-section>
      <q-item-section>4</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Couleur liturgique</q-item-section>
      <q-item-section>Blanc</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Temporal</q-item-section>
      <q-item-section>Oui</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Sanctoral</q-item-section>
      <q-item-section>Non</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Temps liturgique</q-item-section>
      <q-item-section>Temps de l'Épiphanie (Temps de Noël)</q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section class="text-bold">Fête transférée</q-item-section>
      <q-item-section>Non</q-item-section>
    </q-item>
  </q-list>

  <q-btn no-caps flat padding="md" class="full-width text-underline" color="primary"
    style="text-decoration: underline">Textes de la
    messe et de l'office</q-btn>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FestPage',
  setup() {
    return {
    }
  }
});
</script>
