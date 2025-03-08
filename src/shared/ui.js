export const toElement = (domString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(domString, "text/html");

  return doc.documentElement.innerHTML;
};
