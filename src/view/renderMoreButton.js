const renderMoreButton = (parentElement, onClick) => {
  const buttonElement = document.createElement("button");

  buttonElement.classList.add("btn");
  buttonElement.classList.add("primary");
  buttonElement.classList.add("full-width");
  buttonElement.innerText = "더보기";
  buttonElement.addEventListener("click", onClick);

  parentElement.appendChild(buttonElement);
};

export default renderMoreButton;
