import { reactive } from 'vue'
import { TowerEvent } from './models/TowerEvent.js'
import { Ticket } from './models/Ticket.js'
import { Comment } from './models/Comment.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/TowerEvent.js').TowerEvent[]} user info from the database*/
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent} user info from the database*/
  towerEvent: null,
  /** @type {Ticket[]} */
  tickets: [],
  /** @type {Comment[]} */
  comments: [],
})

