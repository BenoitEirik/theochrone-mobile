import { Http } from '../../../src-capacitor/node_modules/@capacitor-community/http/dist/esm';
import { Fest } from './models';

export default async function getImgURL(fests: Array<Fest>) {
  for (let i = 0; i < fests.length; i++) {
    const response = await Http.get({ url: fests[i].massTextURL });

    const body = new DOMParser().parseFromString(
      response.data,
      'text/html'
    ).body;
    const imgURL =
      body.querySelector('#principal .chapo img')?.getAttribute('src') || '';

    if (imgURL == '') {
      return;
    }
    fests[i].img = 'https://introibo.fr/' + imgURL;
  }
}
