import { Router } from 'express'
import { check } from 'express-validator'
import { loginUserController, newUserController, renewUserController } from '../controllers/auth.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { validateRequest } from '../middlewares/validate-request.js'

const authRouter = Router()

authRouter.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateRequest
], loginUserController)

authRouter.post('/new', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must have mininum 6 characters').isLength({ min: 6 }),
  validateRequest
], newUserController)

authRouter.get('/renew', validateJwt, renewUserController)

export default authRouter
