export function randomString(length) {
  return [...Array(length)]
    .map(length => (~~(Math.random() * 36)).toString(36))
    .join('')
}

export function randomNumber(length) {
  return parseInt((Math.random() * 9 + 1) * Math.pow(10, length - 1), 10)
}

export function IRDNumber() {
  var sum = 1,
    IRD,
    weightFactorArray = [3, 2, 7, 6, 5, 4, 3, 2],
    randomArray

  while (sum % 11 != 0) {
    randomArray = Array(7)
      .fill()
      .map(() => Math.floor(Math.random() * 9) + 1)
    randomArray.unshift(0)

    IRD = parseInt(randomArray.join('')) * 10

    sum = 0
    for (var i = 0; i < randomArray.length; i++) {
      sum += randomArray[i] * weightFactorArray[i]
    }
  }
  return IRD
}

export const loginData = {
  method: 'POST',
  url: Cypress.env('apiAuthToken'),
  auth: {
    username: Cypress.env('apiUser'),
    password: Cypress.env('apiPass')
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: {
    grant_type: 'client_credentials',
    resource: 'tax-lodgement-service'
  }
}

export const createAgentRequest = {
  method: 'POST',
  url: Cypress.env('apiBaseUrl') + '/nz/agents',
  headers: {
    Accept: 'application/vnd.api+json',
    'x-myobapi-tenantid': Cypress.env('apiTenantId'),
    'x-myobapi-requestid': '809a8378-1542-437b-b9b0-32550cb6c07f',
    'Content-Type': 'application/json'
  },
  body: {}
}

export const getAgentRequest = {
  method: 'GET',
  url: Cypress.env('apiBaseUrl') + '/nz/agents',
  headers: {
    Accept: 'application/vnd.api+json',
    'x-myobapi-tenantid': Cypress.env('apiTenantId'),
    'x-myobapi-requestid': '809a8378-1542-437b-b9b0-32550cb6c07f'
  }
}

export const deleteAgentRequest = {
  method: 'DELETE',
  headers: {
    Accept: 'application/vnd.api+json',
    'x-myobapi-tenantid': Cypress.env('apiTenantId'),
    'x-myobapi-requestid': '809a8378-1542-437b-b9b0-32550cb6c07f',
    'Content-Type': 'application/json'
  }
}
