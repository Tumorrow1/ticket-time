import { dbContext } from "../db/DbContext.js"

class TicketService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)

    await ticket.populate(`profile event`)
    return ticket
  }
  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate(`event`)
    return tickets
  }

  async getEventTicket(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate(`profile`, `name picture`)
    return tickets
  }

  async deleatTicket(ticketId, userInfo) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    await ticket.deleteOne()
  }
}



export const ticketService = new TicketService()