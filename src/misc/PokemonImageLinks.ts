/* eslint-disable import/prefer-default-export */
interface PkmnImages {
  id: number;
  links: {
    megas: Array<{url: string, description: string}>;
    gmax: Array<{url: string, description: string}>;
    baseForms: Array<{url: string, description: string}>;
  };
}

export const venusaur: PkmnImages = {
  id: 3,
  links: {
    baseForms: [
      {
        url: 'https://cdn.bulbagarden.net/upload/a/ae/003Venusaur.png',
        description: 'Base form',
      },
    ],
    megas: [
      {
        url: 'https://cdn.bulbagarden.net/upload/7/73/003Venusaur-Mega.png',
        description: 'Mega evolution form',
      },
    ],
    gmax: [
      {
        url: 'https://cdn.bulbagarden.net/upload/8/8a/003Venusaur-Gigantamax.png',
        description: 'Gigantamax form',
      },
    ],
  },
};
