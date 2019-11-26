import * as data from '../support/helper.js'

it('get all agents', () => {
  cy.request(data.loginData).then(response => {
    data.getAgentRequest.headers.Authorization = `Bearer ${response.body.access_token}`
    cy.request(data.getAgentRequest).then(get => {
      cy.log(JSON.stringify(get.body.included))
    })
  })
})
