import { defineStore } from 'pinia';
import { Fest } from 'src/assets/js/models';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchField: '',
    fests: [] as Fest[],
  }),
  actions: {
    async retrieve() {
      this.fests.push({
        id: 0,
        img: '',
        massTextURL: '',
        title: '',
        proper: '',
        edition: '',
        celebration: '',
        class: '',
        color: '/images/ornements/white.png',
        temporal: '',
        sanctoral: '',
        liturgicalTime: '',
        transferedFest: '',
      });
      return;
    },
  },
});
