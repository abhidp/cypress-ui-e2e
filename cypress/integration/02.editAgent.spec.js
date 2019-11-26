import { randomString, randomNumber, IRDNumber } from '../support/helper'
import * as agency from '../fixtures/agencyDetails.json'

describe('Edit Agent Settings Spec', () => {
  var agencyName, irdNumber

  before('Create Agent', () => {
    agencyName = `Quasar E2E Edit ${randomString(10)}`
    irdNumber = IRDNumber()
    cy.createNZagent(agencyName, irdNumber)
  })

  it('Click Edit Agent button and Validate modal window', () => {
    cy.get('.table-data__row  ')
      .contains(agencyName)
      .then(elem => {
        cy.get(elem)
          .parent()
          .nextUntil('[role="button"]')
          .eq(3)
          .click()
          .contains('Edit')
          .click()
      })

      //assert
      .get('[role="dialog"]', { timeout: 10000 })
      .should('be.visible') //modal window pop visible
      .get('.flx-modal__title')
      .should('have.text', 'Edit agency') //validate title of modal window

      //Cancel button is enabled
      .get('button')
      .contains('Cancel')
      .should('not.be.disabled')

      //Save button is enabled
      .get('.flx-btn-row__primary-group')
      .find('button')
      .eq(1)
      .should('have.text', 'Save')
      .should('not.be.disabled')
  })

  it('Edit Agency values and Save and validate new details were saved', () => {
    const newAgencyName = `Quasar E2E Edited Value ${randomString(10)}`
    const newIrdNumber = IRDNumber()

    cy.get('[name="agencyName"]')
      .clear()
      .type(newAgencyName)

      //type Valid IRD number
      .get('[name="irNumber"]')
      .clear()
      .type(newIrdNumber)
      .get('[name="clientListNumber"]')
      .clear()
      .type(newIrdNumber)

      //Save button is enabled and clickable
      .get('.flx-btn-row__primary-group')
      .find('button')
      .eq(1)
      .click()

      //validate Agency was created
      .get('.table-data__row  ')
      .should('contain.text', newAgencyName)
  })
})
