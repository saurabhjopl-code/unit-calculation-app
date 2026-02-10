export const STEPS = {
  STYLE_SEARCH: "STYLE_SEARCH",
  STYLE_VERIFIED: "STYLE_VERIFIED",
  SIZE_SELECTED: "SIZE_SELECTED",
  UNIT_ENTERED: "UNIT_ENTERED"
};

export const appState = {
  step: STEPS.STYLE_SEARCH,

  current: {
    sku: null,
    styleId: null,
    imageUrl: null,
    sizes: [],
    units: null
  },

  pending: []
};
