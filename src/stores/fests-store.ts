import { defineStore } from 'pinia';
import { Fest } from 'src/assets/js/models';

export const useFestsStore = defineStore('counter', {
  state: () => ({
    fests: [
      {
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
      },
    ] as Fest[],
  }),
  getters: {
    getFests: (state) => state.fests,
  },
});
