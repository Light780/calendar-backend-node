import { response, request } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import { generateJwt } from '../helpers/jwt.js'

export const newUserController = async (req = request, res = response) => {
  const { email, password } = req.body
  try {
    const usuario = await User.findOne({ email })

    if (usuario != null) {
      return res.status(400).json({
        ok: false,
        msg: 'User with that email already exists'
      })
    }

    const user = new User(req.body)

    // Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    // Generate JWT
    const token = await generateJwt(user.id, user.name)

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }
}

export const loginUserController = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    // Check password
    if (user == null || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        ok: false,
        msg: 'Bad credentials'
      })
    }

    // Generate JWT
    const token = await generateJwt(user.id, user.name)

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }
}

export const renewUserController = async (req = request, res = response) => {
  const { uid, name } = req

  // Generate New Token
  const token = await generateJwt(uid, name)

  res.status(200).json({
    ok: true,
    uid,
    name,
    token
  })
}
