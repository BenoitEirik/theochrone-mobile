interface Fest {
  id: number;
  img: string;
  massTextURL: string;
  title: string;
  proper: string;
  edition: string;
  celebration: string;
  class?: string; // PAL fests have no class
  color: string;
  temporal: string;
  sanctoral: string;
  liturgicalTime: string;
  transferedFest: string;
  pal: boolean;
}

interface MapDayFest extends Map<string, Fest[]> {}

export {
  type Fest,
  type MapDayFest
}