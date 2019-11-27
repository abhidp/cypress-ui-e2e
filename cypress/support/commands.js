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

Cypress.Commands.add('createNZagentAPI', (agencyName, irdNumber) => {
  cy.request(data.loginData).then(response => {
    data.createAgentRequest.headers.Authorization = `Bearer ${response.body.access_token}`
    data.createAgentRequest.body.irNumber = irdNumber
    data.createAgentRequest.body.name = agencyName
    data.createAgentRequest.body.clientListNumber = irdNumber
    cy.request(data.createAgentRequest)
  })
})

Cypress.Commands.add('getAllAgentsAPI', () => {
  cy.request(data.loginData).then(response => {
    data.getAgentRequest.headers.Authorization = `Bearer ${response.body.access_token}`
    cy.request(data.getAgentRequest).then(get => {
      if (get.body.included === undefined) {
        cy.log('No Agents in the DB')
        cy.writeFile('cypress/fixtures/agentsList.json', {})
      } else {
        cy.writeFile('cypress/fixtures/agentsList.json', get.body.included)
      }
    })
  })
})

Cypress.Commands.add('deleteAllAgentsAPI', () => {
  cy.request(data.loginData).then(response => {
    cy.readFile('cypress/fixtures/agentsList.json').then(content => {
      data.deleteAgentRequest.headers.Authorization = `Bearer ${response.body.access_token}`
      cy.log('content == ', content)
      if (content == {}) {
        cy.log('Nothing to Delete')
      } else {
        for (let i = 0; i < content.length; i++) {
          data.deleteAgentRequest.url =
            Cypress.env('apiBaseUrl') + '/nz/agents/' + `${content[i].id}`
          cy.log(data.deleteAgentRequest.url)
          cy.request(data.deleteAgentRequest).then(del => {
            data.deleteAgentRequest.url =
              Cypress.env('apiBaseUrl') + '/nz/agents/' + `${content[i].id}`
            cy.log('Response', JSON.stringify(del))
          })
        }
      }
    })
  })
})
