function makeDom(elementName, innerHTML) {
  if (!innerHTML) {
    return { dom: document.createElement(elementName) };
  }
  const dom = document.createElement(elementName);
  dom.innerHTML = innerHTML;

  return {
    dom,
  };
}

export { makeDom };
