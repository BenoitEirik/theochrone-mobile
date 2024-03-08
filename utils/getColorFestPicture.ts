export default (color: string): string | undefined => {
  const ornamentPictures: { [string: string]: string } = {
    Noir: '/images/ornements/black.png',
    Blanc: '/images/ornements/white.png',
    Or: '/images/ornements/gold.png',
    Vert: '/images/ornements/green.png',
    Rose: '/images/ornements/pink.png',
    Violet: '/images/ornements/purple.png',
    Rouge: '/images/ornements/red.png',
  }

  return color in ornamentPictures ? ornamentPictures[color] : undefined
}
