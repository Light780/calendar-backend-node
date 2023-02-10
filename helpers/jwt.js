import jwt from 'jsonwebtoken'

export const generateJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '5h'
    }, (err, token) => {
      if (err) {
        reject(new Error('Error while generating token'))
      }

      resolve(token)
    })
  })
}
