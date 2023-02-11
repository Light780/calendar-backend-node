import { request, response } from 'express'
import { Event } from '../models/event.model.js'

export const getEvents = async (req = request, res = response) => {
  try {
    const events = await Event.find({ user: req.uid })
      .populate('user', 'name')

    res.status(200).json({
      ok: true,
      events
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }
}

export const addEvent = async (req = request, res = response) => {
  const event = new Event(req.body)

  try {
    event.user = req.uid
    const savedEvent = await event.save()

    res.status(200).json({
      ok: true,
      event: savedEvent
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }
}

export const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id
  const uid = req.uid
  try {
    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exists'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Can not update event another users event'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

    res.status(200).json({
      ok: true,
      event: updatedEvent
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }
}

export const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id
  const uid = req.uid
  try {
    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exists'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Can not delete event another users event'
      })
    }

    await Event.findByIdAndDelete(eventId)

    res.status(200).json({
      ok: true,
      msg: 'Event deleted'
    })
  } catch (error) {
    res.status(200).json({
      ok: false,
      msg: 'Please contact the admin'
    })
  }
}
