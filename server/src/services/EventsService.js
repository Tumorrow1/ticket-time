import { Error } from "mongoose"
import { dbContext } from "../db/DbContext.js"

class EventsService {
  async createEvent(eventData) {
    console.log(`🐒📡`, eventData) // good
    const event = await dbContext.TowerEvents.create(eventData) // good
    await event.populate(`creator`, `name picture`)
    return event


  }
  async getAllEvents() {
    const gatherings = await dbContext.TowerEvents.find().populate(`creator`, `name picture`).sort(`-createdAt`)
    return gatherings
  }
  async getAllEventsById(eventId) {
    const event = (await (await dbContext.TowerEvents.findById(eventId)).populate(`creator`, `name picture`)).populate(`ticketCount`)

    return event


  }
  async editEvent(eventId, eventData, userInfo) {
    const editEvent = await this.getAllEventsById(eventId)
    if (editEvent.creatorId != userInfo.id)
      throw new Error(`not your event `)
    editEvent.name = eventData.name ?? editEvent.name
    editEvent.description = eventData.description ?? editEvent.description
    editEvent.location = eventData.location ?? editEvent.location
    await editEvent.save()
    return editEvent
  }

  async cancelEvent(eventId, userInfo) {
    const event = await this.getAllEventsById(eventId)
    if (event.creatorId != userInfo.id) {
      throw new Error(`not your gummies by shaq`)
    }
    event.isCanceled = !event.isCanceled
    await event.save()
    return event
  }
}
export const eventsService = new EventsService()