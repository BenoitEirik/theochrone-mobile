import { defineStore } from 'pinia';
import getImgURL from 'src/assets/js/getImgURL';
import { Fest } from 'src/assets/js/models';
import { Http } from '../../src-capacitor/node_modules/@capacitor-community/http';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchField: '',
    yearField: new Date().getFullYear(),
    fests: [] as Fest[],
  }),
  actions: {
    async retrieve() {
      if (this.searchField === '') return;
      this.fests = [];

      const response = await Http.get({
        url: `https://theochrone.fr/kalendarium/mot_clef?annee=${this.yearField}&recherche=${this.searchField}&plus=on&pal=false&martyrology=false&proper=roman#resultup`,
      });

      // Init virtual DOM from theochrone.fr
      const body = new DOMParser().parseFromString(
        response.data,
        'text/html'
      ).body;
      const festsElement = body.querySelector(
        '#resultup .container .row div div .panel-group'
      );

      for (let i = 0; i < Number(festsElement?.childElementCount); i++) {
        const attributesElement =
          festsElement?.children[i].querySelector(
            '.panel-collapse .panel-body .container .row .col-md-6 table tbody'
          )?.children || new HTMLCollection();

        const newFest = {
          id: i,
          img: '',
          massTextURL:
            festsElement?.children[i]
              .querySelector('.panel-collapse .panel-footer a')
              ?.getAttribute('href') || '',
          title:
            festsElement?.children[i].querySelector(
              '.panel-heading .panel-title a'
            )?.innerHTML || '',
          proper: attributesElement[0].children[1].innerHTML || '',
          edition: attributesElement[1].children[1].innerHTML || '',
          celebration: attributesElement[2].children[1].innerHTML || '',
          class: attributesElement[3].children[1].innerHTML || '',
          color: attributesElement[4].children[1].innerHTML || 'Blanc',
          temporal: attributesElement[5].children[1].innerHTML || '',
          sanctoral: attributesElement[6].children[1].innerHTML || '',
          liturgicalTime: attributesElement[7].children[1].innerHTML || '',
          transferedFest: attributesElement[8].children[1].innerHTML || '',
        };

        this.fests.push(newFest);
      }

      // Get imgURL
      getImgURL(this.fests);
    },
  },
});
