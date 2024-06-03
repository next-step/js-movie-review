import "./css/reset.css";
import "./css/common.css";
import { Controller } from "./js/controller";

addEventListener("DOMContentLoaded", async () => {
  const controller = new Controller();
  controller.init();
});
