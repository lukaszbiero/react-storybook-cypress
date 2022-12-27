let componentUrl = '';

const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

const parseStoryDirectory = (str) => str && str.split('/').map(toKebabCase).join('--');

Cypress.Commands.add('loadStory', (storyName, eventBindings = []) => {
  componentUrl = `iframe.html?id=${parseStoryDirectory(storyName)}`;
  cy.visit(componentUrl);
});

Cypress.Commands.add('changeArg', (knobName, knobValue) => {
  componentUrl = `${componentUrl}&args=${knobName.replace(/ /g, '%20')}:${knobValue}`;
  cy.visit(componentUrl);
});

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test-id=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test-id*=${selector}]`, ...args);
});