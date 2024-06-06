import LogoImage from "../../assets/logo.png";

class Logo {
  constructor() {
    this.element = this.element();
  }

  element() {
    const h1 = document.createElement("h1");
    const img = document.createElement("img");

    img.src = LogoImage;

    h1.appendChild(img);
    return h1;
  }
}

export default Logo;
