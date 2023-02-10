import { request, response } from 'express'
import jwt from 'jsonwebtoken'

export const validateJwt = (req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token in request'
    })
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_KEY)

    req.uid = uid
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    })
  }

  next()
}
