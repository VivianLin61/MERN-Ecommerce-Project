// const baseUrl =
//   location.hostname === 'localhost'
//     ? 'http://localhost:2000'
//     : 'https://ecommerce-back-end-server.herokuapp.com'
const baseUrl = 'http://localhost:2000'
// const baseUrl = 'https://ecommerce-back-end-server.herokuapp.com'
export const api = `${baseUrl}/api`

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`
}
