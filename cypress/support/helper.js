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
  url: 'https://sit.login.myob.com/oauth2/token',
  auth: {
    username: 'agent-delete-client-has-access',
    password: 'Tsq\\j7QP8DaA9+7//#qy'
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
  url:
    'https://tax-lodgement-api-sit.apps.svc.platform.myobdev.com/api/nz/agents',
  headers: {
    Accept: 'application/vnd.api+json',
    'x-myobapi-tenantid': 'f524999e-5bc6-408d-a733-ed9335673869',
    'x-myobapi-requestid': '809a8378-1542-437b-b9b0-32550cb6c07f',
    'Content-Type': 'application/json'
  },
  body: {}
}

export const getAgentRequest = {
  method: 'GET',
  url:
    'https://tax-lodgement-api-sit.apps.svc.platform.myobdev.com/api/nz/agents',
  headers: {
    Accept: 'application/vnd.api+json',
    'x-myobapi-tenantid': 'f524999e-5bc6-408d-a733-ed9335673869',
    'x-myobapi-requestid': '809a8378-1542-437b-b9b0-32550cb6c07f'
  }
}
