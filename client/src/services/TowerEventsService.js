import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class TowerEventsService {
  async getTowerEvents() {
    const response = await api(`api/events`)
    logger.log(`got events`, response.data)
    const events = response.data.map(pojo => new TowerEvent(pojo))
    AppState.towerEvents = events

  }

  async createEvent(eventData) {
    const response = await api.post(`api/events`, eventData)
    logger.log(`creating an event man`, response.data)
    const towerEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(towerEvent)
    return towerEvent
  }
  async getTowerEventsById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    logger.log(`got events`, response.data)
    AppState.towerEvent = new TowerEvent(response.data)
  }

  async cancelEvent(eventId) {
    logger.log('🐒cancel', eventId)
    const response = await api.delete(`api/events/${eventId}`)
    logger.log(`no cancel`, response.data)
    AppState.towerEvent = new TowerEvent(response.data)



  }


}


export const towerEventsService = new TowerEventsService()