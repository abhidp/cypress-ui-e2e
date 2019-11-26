// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import * as data from './helper.js'

// before(() => {
//   cy.login()
//   cy.selectPractice('AODB1')
//   cy.gotoSettings()
//   cy.gotoAgencyDetails()
// })

// after(() => {
//   cy.clearCookie('token')
// })

// beforeEach('wire up user data', function() {
//   Cypress.Cookies.preserveOnce('token')
// })

Cypress.Commands.add('login', () => {
  cy.visit('/')
    .get('#UserName')
    .clear()
    .type(Cypress.env('user'))
    .get('#Password')
    .clear()
    .type(Cypress.env('pass'))
    .get('.btn-block')
    .click()

  cy.contains('Select Practice', { timeout: 30000 }).should('be.visible')
})

Cypress.Commands.add('selectPractice', practice => {
  cy.request('/select-practice')
  cy.contains('Select Practice', { timeout: 30000 })
    .should('be.visible')
    .get('.form-control')
    .select(practice)
    .get('[type="submit"]')
    .click()
    .location('pathname', { timeout: 30000 })
    .should('eq', '/clients')
})

Cypress.Commands.add('gotoSettings', () => {
  cy.get('[data-testid="qa-sidebar-settings"]')
    .click()
    .location('pathname', { timeout: 30000 })
    .should('eq', '/ledgers/practice')
})

Cypress.Commands.add('gotoAgencyDetails', () => {
  cy.get('[data-testid="qa-settings-menu-agency_details"]')
    .click()
    //validate pathname/URL
    .location('pathname', { timeout: 30000 })
    .should('eq', '/settings/nz/agent-details')
})

Cypress.Commands.add('createNZagent', (agencyName, irdNumber) => {
  cy.request(data.loginData).then(response => {
    data.createAgentRequest.headers.Authorization = `Bearer ${response.body.access_token}`
    data.createAgentRequest.body.irNumber = irdNumber
    data.createAgentRequest.body.name = agencyName
    data.createAgentRequest.body.clientListNumber = irdNumber
    cy.request(data.createAgentRequest)
  })
})
