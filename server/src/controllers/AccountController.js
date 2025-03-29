import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService.js'
import BaseController from '../utils/BaseController.js'
import { ticketService } from '../services/TicketService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get(`/tickets`, this.getMyTickets)
    // TODO get tickets to events I have (get albums I am watching)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyTickets(request, response, next) {
    try {
      const userInfo = request.userInfo
      const Tickets = await ticketService.getMyTickets(userInfo.id)
      response.send(Tickets)
    }
    catch (error) {
      next(error)
    }
  }

}
