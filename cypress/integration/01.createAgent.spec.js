import { randomString, randomNumber, IRDNumber } from '../support/helper'
import * as agency from '../fixtures/agencyDetails.json'

describe('Create Agent Settings Spec', () => {
  it('Validate Click Add agency modal window', () => {
    //click Add agency button
    cy.contains('Add agency')
      .click()

      //assert
      .get('[role="dialog"]', { timeout: 10000 })
      .should('be.visible') //modal window pop visible
      .get('.flx-modal__title')
      .should('have.text', 'Add agency') //validate title of modal window

      //Cancel button is enabled
      .get('button')
      .contains('Cancel')
      .should('not.be.disabled')

      //Add button is disabled
      .get('.flx-btn-row__primary-group')
      .find('button')
      .eq(1)
      .should('have.text', 'Add')
      .should('be.disabled')

      //close Modal window
      .get('.close')
      .click()
  })

  it('Validate error msgs for entering invalid values', () => {
    cy.contains('Add agency')
      .click()

      //type Agency Name then delete
      .get('[name="agencyName"]')
      .clear()
      .type(randomString(10))
      .clear()
      //assert Err msg
      .siblings()
      .should('have.text', 'Enter an agency name')

      //type invalid IRD number
      .get('[name="irNumber"]')
      .clear()
      .type(randomNumber(6))
      //assert Err msg
      .siblings()
      .should('have.text', 'Enter a valid IRD number')

      //type invalid client list number
      .get('[name="clientListNumber"]')
      .clear()
      .type(randomNumber(6))
      //assert Err msg
      .siblings()
      .should('have.text', 'Enter a valid client list number')

      .get('.close')
      .click()
  })

  it('Fill up form with Valid data and validate agency was added', () => {
    const agencyName = `Quasar E2E Create ${randomString(10)}`
    const irdNumber = IRDNumber()

    cy.contains('Add agency')
      .click()
      .get('[name="agencyName"]')
      .clear()
      .type(agencyName)

      //type Valid IRD number
      .get('[name="irNumber"]')
      .clear()
      .type(irdNumber)
      .get('[name="clientListNumber"]')
      .clear()
      .type(irdNumber)

      //Add button is enabled and clickable
      .get('.flx-btn-row__primary-group')
      .find('button')
      .eq(1)
      .should('have.text', 'Add')
      .should('not.be.disabled')
      .click()

      //validate Agency was created
      .get('.table-data__row  ')
      .should('contain.text', agencyName)
  })
})
