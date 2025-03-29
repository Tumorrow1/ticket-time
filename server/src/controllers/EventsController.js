
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext.js";
import { ticketService } from "../services/TicketService.js";

export class EventsController extends BaseController {
  constructor() {
    super(`api/events`)
    this.router
      .get(`/:eventId`, this.getAllEventsById)
      .get(``, this.getAllEvents)
      .get(`/:eventId/tickets`, this.getEventTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put(`/:eventId`, this.editEvent)
      .post(``, this.createEvent)
      .delete(`/:eventId`, this.cancelEvent)
    // TODO Get Tickets for an event, Ref (watchers watching an album)


  }
  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userInfo = request.userInfo
      const event = await eventsService.cancelEvent(eventId, userInfo)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async editEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const eventData = request.body
      const userInfo = request.userInfo
      const editEvent = await eventsService.editEvent(eventId, eventData, userInfo)
      response.send(editEvent)
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async getAllEventsById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await eventsService.getAllEventsById(eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async getAllEvents(request, response, next) {
    try {
      const gatherings = await eventsService.getAllEvents()
      response.send(gatherings)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      const userInfo = request.userInfo
      eventData.creatorId = userInfo.id
      eventData.isCanceled = false
      console.log(`no data`, eventData) //good
      const event = await eventsService.createEvent(eventData)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getEventTickets(request, response, next) {
    try {
      const towerEventId = request.params.eventId
      const tickets = await ticketService.getEventTicket(towerEventId)
      response.send(tickets)

    } catch (error) {
      next(error)
    }
  }



}