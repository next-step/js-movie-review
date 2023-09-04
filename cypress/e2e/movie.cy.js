const SELECTOR = Object.freeze({
  ITEM_LIST: '.item-list',
  ITEM: '.item',
  MORE_BUTTON: '#item-more-button',
});

describe('Movie Lists', () => {
  const isVisible = (selector) => {
    cy.get(selector).should('be.visible');
  };

  const hasValidLength = (selector, times = 1) =>
    cy.get(selector).should('have.length', times);

  const click = (selector) => {
    cy.get(selector).click();
  };

  beforeEach('Page Connected', () => {
    cy.visit('http://localhost:8080');
  });

  it('Initial Movie list item 20 loaded', () => {
    isVisible(SELECTOR.ITEM);
    hasValidLength(SELECTOR.ITEM, 20);
  });

  it('More Button Click -> plus 20 items loaded', () => {
    click(SELECTOR.MORE_BUTTON);
    hasValidLength(SELECTOR.ITEM, 40);
  });
});
