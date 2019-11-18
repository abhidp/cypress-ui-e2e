// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands('login')
Cypress.Commands.add('login', () => {
  cy.visit('/')
    .get('#UserName').clear().type(Cypress.env('user'))
    .get('#Password').clear().type(Cypress.env('pass'))
    .get('.btn-block').click()  
})

Cypress.Commands.add('selectPractice', (practice) => {
  cy.request('/select-practice')
    .get('.form-control').select(practice)
    .get('[type="submit"]').click()
    .location('pathname').should('eq', '/clients')
})

Cypress.Commands.add('gotoSettings', () => {
  cy.get('[data-testid="qa-sidebar-settings"]').click()
    .location('pathname').should('eq','/ledgers/practice')
})