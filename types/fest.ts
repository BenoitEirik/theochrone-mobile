interface Fest {
  id: number;
  img: string;
  massTextURL: string;
  title: string;
  proper: string;
  edition: string;
  celebration: string;
  class: string;
  color: string;
  temporal: string;
  sanctoral: string;
  liturgicalTime: string;
  transferedFest: string;
}

interface MapDayFest extends Map<string, Fest[]> {}

export {
  type Fest,
  type MapDayFest
}