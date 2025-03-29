import BaseController from "../utils/BaseController.js";

export class CommentsContoller extends BaseController {
  constructor() {
    super(`api/comments`)
    this.router
      .post(``, this.CreateComment)

  }

  /**
      * @param {import("express").Request} request
      * @param {import("express").Response} response
      * @param {import("express").NextFunction} next
      */
  async CreateComment(request, response, next) {
    try {
      console.log(`comments Controller🎮`)
    } catch (error) {
      next(error)
    }
  }
}
