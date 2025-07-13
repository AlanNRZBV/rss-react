export const errorMessages = {
  searchBarErrorMsg: 'Search bar render failed. Please try again later ',
  itemListErrorMsg: 'Pokemon list render failed. Please try again later',
} as const;

export type ErrorBoundaryMessage = typeof errorMessages;
