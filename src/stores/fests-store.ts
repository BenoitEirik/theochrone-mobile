import { defineStore } from 'pinia';
import { Fest } from 'src/assets/js/models';

const storeModel = {
  state: () => ({
    index: 0,
    date: formatDate(new Date()),
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
  actions: {
    formatDate(date: Date) {
      return formatDate(date);
    },
  },
};

function formatDate(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}

export const allFestsStores = {
  useMainFestsStore: defineStore('homeStore', { ...storeModel }),
  useSecondaryFestsStore: defineStore('festStore', { ...storeModel }),
};
