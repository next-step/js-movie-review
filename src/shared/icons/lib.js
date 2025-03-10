export const createSvgIcon = (svgString) => {
  return new DOMParser().parseFromString(svgString, "image/svg+xml")
    .documentElement;
};
