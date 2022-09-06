export const encodeForUrl = (string) =>
  encodeURIComponent(string.trim().replaceAll(' ', '-'));

export const decodeFromUrl = (encodedString) =>
  decodeURIComponent(encodedString).replaceAll('-', ' ');

export const encodeForQuery = (string) =>
  encodeURIComponent(string.trim().replaceAll(' ', '+'));

export const decodeFromQuery = (encodedQuery) =>
  decodeURIComponent(encodedQuery).replaceAll('+', ' ');
