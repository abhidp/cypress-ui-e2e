export function randomString(length) {
  return [...Array(length)].map(length => (~~(Math.random() * 36)).toString(36)).join('')
}

export function randomNumber(length){
  return parseInt((Math.random() * 9 + 1) * Math.pow(10, length-1), 10)
}