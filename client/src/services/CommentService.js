import { Comment } from "@/models/Comment.js"
import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class CommentService {
  async getCommentsByEvent(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`,)
    AppState.comments = response.data
  }

  async createComment(commentData) {
    //TODO 3, Service confirms what it was told to do 🐒
    console.log(`monkey sever`)

    //TODO 4, Tell the API what is happening
    const response = await api.post(`api/comments`, commentData)
    logger.log(`created ticket`, response.data)

    // TODO 5, Change The State (AppState)
    const comment = new Comment(response.data)
    AppState.comments.push(comment)
    console.log(`no ticketrs`, comment)
    return comment

  }

  async deleatComment(Id) {
    const response = await api.delete(`api/comments/${Id}`)
    console.log(response.data)

    const index = AppState.comments.findIndex(comment => comment.id === Id)
    AppState.comments.splice(index, 1)
  }



}
export const commentService = new CommentService()