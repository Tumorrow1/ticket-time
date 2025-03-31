import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import { commentService } from "../services/CommentService.js";
import BaseController from "../utils/BaseController.js";

export class CommentController extends BaseController {
  constructor() {
    super(`api/comments`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.createComment)
      .delete(`/:commentsId`, this.deleatComment)



  }
  /**
      * @param {import("express").Request} request
      * @param {import("express").Response} response
      * @param {import("express").NextFunction} next
      */
  async deleatComment(request, response, next) {
    try {
      console.log(`deleat is working `)
      const userInfo = request.userInfo
      userInfo.id
      const comment = await commentService.deleatComment(request.params.commentsId, userInfo.id)
      return response.send()
    } catch (error) {
      next(error)
    }
  }

  /**
      * @param {import("express").Request} request
      * @param {import("express").Response} response
      * @param {import("express").NextFunction} next
      */
  async createComment(request, response, next) {
    try {

      const commentData = request.body
      const userInfo = request.userInfo
      commentData.creatorId = userInfo.id
      console.log(`another one`, commentData)
      const comment = await commentService.createComment(commentData)
      response.send(comment)

    } catch (error) {

      next(error)
    }
  }
}
