import LogoImage from "../../assets/logo.png";

export class Logo {
  render() {
    const h1 = document.createElement("h1");
    const img = document.createElement("img");

    img.src = LogoImage;

    h1.appendChild(img);
    return h1;
  }
}
