import "./css/common.css";
import "./css/reset.css";
import { Controller } from "./js/controller";

addEventListener("DOMContentLoaded", async () => {
  const controller = new Controller;
  controller.init();
});
