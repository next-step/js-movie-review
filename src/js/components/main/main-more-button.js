export const mainMoreButton = {
  render() {
    const element = document.createElement("button");
    element.classList.add("btn", "primary", "full-width");
    element.innerText = "더 보기";

    return element;
  },
};
