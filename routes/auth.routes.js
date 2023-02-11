import { Router } from 'express'
import { check } from 'express-validator'
import { loginUserController, newUserController, renewUserController } from '../controllers/auth.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { validateRequest } from '../middlewares/validate-request.js'

export const authRouter = Router()

authRouter.post('/login', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').notEmpty(),
  validateRequest
], loginUserController)

authRouter.post('/new', [
  check('name', 'name is required').notEmpty(),
  check('email', 'email is required').isEmail(),
  check('password', 'password must have mininum 6 characters').isLength({ min: 6 }),
  validateRequest
], newUserController)

authRouter.get('/renew', validateJwt, renewUserController)
