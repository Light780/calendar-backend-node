import { Router } from 'express'
import { check } from 'express-validator'
import { addEvent, deleteEvent, getEvents, updateEvent } from '../controllers/event.controller.js'
import { isDate } from '../helpers/isDate.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { validateRequest } from '../middlewares/validate-request.js'

export const eventRouter = Router()

eventRouter.use(validateJwt)

// Get all events
eventRouter.get('/', validateRequest, getEvents)

// Create new event
eventRouter.post('/',
  [
    check('title', 'title is required').notEmpty(),
    check('start', 'start is required').custom(isDate),
    check('end', 'end is required').custom(isDate)
  ],
  validateRequest, addEvent)

// Update event
eventRouter.put('/:id', validateRequest, updateEvent)

// Delete event
eventRouter.delete('/:id', validateRequest, deleteEvent)
