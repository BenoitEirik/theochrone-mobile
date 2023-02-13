export interface Fest {
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

export interface TextesPlugin {
  getFestTextes(options: { url: string }): Promise<{ data: string }>;
}
