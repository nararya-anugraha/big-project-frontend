export const generateKey = () =>
  new Date().getTime().toString(36) +
  Math.random()
    .toString(36)
    .replace("0.", ".");
