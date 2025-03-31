import { dbContext } from "../db/DbContext.js"


class CommentService {
  async getCommentById(commentsId) {
    const comment = await dbContext.Comment.findById(commentsId)
    console.log(`not your id shaq`)
    return comment
  }


  async createComment(commentData) {
    // const comments = await commentService.(commentData)
    console.log(`📡🛒🎮`)

    const comment = await dbContext.Comment.create(commentData)
    console.log(`this is populate`)
    await comment.populate(`creator`, `creatorId picture name`)
    return comment


    //  async createTicket(ticketData) {
    //   const ticket = await dbContext.Tickets.create(ticketData)

    //   await ticket.populate(`profile event`)
    //   return ticket
    // }
  }





  async getEventComments(eventId) {
    const comments = await dbContext.Comment.find({ eventId: eventId }).populate(`creator`, `name picture`)
    return comments
  }

  async deleatComment(commentId, creatorId) {
    const comments = await dbContext.Comment.findById(commentId)
    console.log(`shaq`, comments)
    await comments.deleteOne()
    return
  }

}
export const commentService = new CommentService()