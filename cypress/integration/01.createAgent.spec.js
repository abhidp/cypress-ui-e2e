import {randomString, randomNumber} from '../support/helper'

describe('Agent Settings Spec', () => {
  before('Login', () => {
    cy.login()
    cy.selectPractice('AODB1')
    cy.gotoSettings()
  })

  it('Navigate to Agency details', () => {
    cy.get('[data-testid="qa-settings-menu-agency_details"]').click()
      .location('pathname').should('eq','/settings/nz/agent-details')
  })

  it('Click Add agency button', () => {
    //click Add agency button
    cy.contains('Add agency').click()
     
    //assert  
      .get('[role="dialog"]', { timeout: 10000 }).should('be.visible')  //modal window pop visible
      .get('.flx-modal__title').should('have.text', 'Add agency') //validate title = Add agency
  })

  it('Fill up form and Add agency', () => {
    cy.get('[name="agencyName"]').clear().type(randomString(10))
      .get('[name="irNumber"]').clear().type(randomNumber(9))
      .get('[name="clientListNumber"]').clear().type(randomNumber(9))
  })

})
