function appendFragments(parentElement, elements) {
    const fragment = document.createDocumentFragment();
    elements.forEach((element) => fragment.appendChild(element));
    parentElement.appendChild(fragment);
}

export default appendFragments;
