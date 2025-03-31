import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Ticket } from "@/models/Ticket.js"



class TicketsService {

  async createTicket(ticketData) {
    //TODO 3, Service confirms what it was told to do 🐒
    console.log(`monkey sever`)

    //TODO 4, Tell the API what is happening
    const response = await api.post(`api/tickets`, ticketData)
    logger.log(`created ticket`, response.data)

    // TODO 5, Change The State (AppState)
    const ticket = new Ticket(response.data)
    AppState.tickets.push(ticket)
    AppState.towerEvent.ticketCount++
    console.log(`no ticketrs`)
    return ticket
  }

  async getTicketById(eventId) {
    console.log(`🐄`, eventId)
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log(`got ticket id`, response.data)
    const tickets = response.data.map(pojo => new Ticket(pojo))
    AppState.tickets = tickets
  }

  async getMyTickets() {
    console.log(`🦒📡`)
    const response = await api.get(`account/tickets`)
    logger.log(`got my tickets`, response.data)
    const tickets = response.data.map(pojo => new Ticket(pojo))
    AppState.tickets = tickets

  }


  async deleatTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log(`deleat ticket`, response.data)
  }


}

export const ticketsService = new TicketsService()