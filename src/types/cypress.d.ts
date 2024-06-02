import * as Cypress from "cypress";

declare global {
  interface Window {
    Cypress: Cypress.Cypress;
  }
}

export {};
