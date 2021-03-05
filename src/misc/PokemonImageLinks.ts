/* eslint-disable import/prefer-default-export */
interface PkmnImages {
  id: number;
  links: {
    megas: Array<string>;
    gmax: Array<string>;
    baseForms: Array<string>;
  };
}

export const venusaur: PkmnImages = {
  id: 3,
  links: {
    baseForms: [
      'https://archives.bulbagarden.net/media/upload/a/ae/003Venusaur.png',
    ],
    megas: [
      'https://archives.bulbagarden.net/media/upload/7/73/003Venusaur-Mega.png',
    ],
    gmax: [
      'https://archives.bulbagarden.net/media/upload/8/8a/003Venusaur-Gigantamax.png',
    ],
  },
};
