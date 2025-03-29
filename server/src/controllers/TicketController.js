import { request, response } from "express";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";
import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";


export class TicketController extends BaseController {
  constructor() {
    super(`api/tickets`)
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.createTicket)
      .delete(`/:ticketId`, this.deleatTicket)

  }
  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */

  async createTicket(request, response, next) {
    try {
      const ticketData = request.body
      const userInfo = request.userInfo
      ticketData.accountId = userInfo.id
      const ticket = await ticketService.createTicket(ticketData)
      response.send(ticket)

    } catch (error) {
      next(error)
    }
  }

  async deleatTicket(request, response, next) {
    try {
      const ticketId = request.params.ticketId
      const userInfo = request.userInfo
      const message = await ticketService.deleatTicket(ticketId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}