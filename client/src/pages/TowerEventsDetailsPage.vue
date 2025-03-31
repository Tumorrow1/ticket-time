<script setup>

import { AppState } from '@/AppState.js';
import { TowerEvent } from '@/models/TowerEvent.js';
import { ticketsService } from '@/services/TicketsService.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { isCancel } from 'axios';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AccountPage from './AccountPage.vue';
import { commentService } from '@/services/CommentService.js';

const route = useRoute()
const tickets = computed(() => AppState.tickets)
const activeEvent = computed(() => AppState.towerEvent)
const comments = computed(() => AppState.comments)
const account = computed(() => AppState.account)

// TODO 6,7 is if we can
// TODO 6, Get Tickets From Appstate



onMounted(() => {
  getTowerEventsById()
  getTicketById()
  getCommentsByEvent()
  // console.log(`hi `, activeEvent.value.creatorId + " vs. " + account.value.id)


})

async function getTowerEventsById() {
  try {
    const eventId = route.params.eventsId
    console.log(`does it atualy work`, eventId)
    await towerEventsService.getTowerEventsById(eventId)
  } catch (error) {
    Pop.error(error, `couldnt get enent by id `)
    logger.error(`no event by id man`)
  }
}
async function getCommentsByEvent() {
  try {
    const eventId = route.params.eventsId
    console.log(`does it atualy work`, eventId)
    await commentService.getCommentsByEvent(eventId)
  } catch (error) {
    Pop.error(error, `couldnt get comment by id `)
    logger.error(`no event by comment man`)
  }
}

async function cancelEvent() {
  try {
    console.log(`cancel`, activeEvent.value.id)
    await towerEventsService.cancelEvent(activeEvent.value.id)
  } catch (error) {
    Pop.error(error, `no shq`)
  }
}

async function createTicket() {
  try {
    // TODO 1, get the function to run when I want it to
    const ticketData = { eventId: route.params.eventsId }
    console.log(`geting tickes`, ticketData)
    // TODO 2 Tell the service what is happening
    await ticketsService.createTicket(ticketData)

  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

async function getTicketById() {
  try {
    console.log(`no ticket id`)
    const eventsId = route.params.eventsId
    console.log(`cow`, eventsId)
    await ticketsService.getTicketById(eventsId)
  }
  catch (error) {
    Pop.error(error)
  }
}

async function createComment() {
  try {
    console.log(`create a comment`)
    document.getElementById(`CommentsHere`)
    const body = document.getElementById(`CommentsHere`).value
    console.log(`getting to the body`, body)
    const commentData = { eventId: route.params.eventsId, body }
    await commentService.createComment(commentData)


  } catch (error) {
    Pop.error(error)
  }
}
async function deleatComment(id) {
  try {
    console.log(`deleat maybe please`)
    commentService.deleatComment(id)
  } catch (error) {
    Pop.error
  }

}
</script>


<!-- TODO 7 Render Tickets to the Page -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-if="activeEvent">
          <h1>{{ activeEvent.name }}</h1>
        </div>
        <div>
          <div v-if="activeEvent" class="card">
            <img :src="activeEvent.coverImg" class="card-img-top" :alt="activeEvent.name">
            <div class="card-body">
              <!-- TODO this only shows up if the event is canceled -->
              <h3 v-if="activeEvent.isCanceled" class="text-danger">CANCELED</h3>
              <!-- TODO this only shows up if the even is sold out (the capacity and ticket count are the same) -->
              <h3 v-if="activeEvent.capacity == activeEvent.ticketCount" class="text-teal">SOLD OUT</h3>
              <p class="card-text">{{ activeEvent.description }}</p>

              <div>{{ activeEvent.ticketCount }}</div>
              <div>{{ activeEvent.capacity }}</div>
              <div>{{ activeEvent.location }}</div>
              <div>{{ activeEvent.startDate }}</div>
              <div>{{ activeEvent.type }}</div>
            </div>
            <div><button v-if="account && account.id === activeEvent.creatorId" @click="cancelEvent()"
                class="btn btn-danger">Event
                {{ activeEvent.isCanceled ? `is canceled` : `is not canceled` }}

              </button>
              <div
                v-if="tickets && tickets.findIndex(ticket => ticket.accountId === account.id && ticket.eventId === activeEvent.id) > -1">
                <i class="mdi mdi-check"></i>
              </div>
            </div>
          </div>
          <div>
            <!-- TODO HIDE THIS BUTTON WHEN SOLD OUT AND WHEN THE EVENT IS CANCELED -->
            <button v-if="activeEvent && !activeEvent.isCanceled && activeEvent.capacity > activeEvent.ticketCount"
              @click="createTicket()">
              getTicket
            </button>
          </div>
          <div></div>
          <div v-for="ticket in tickets" :key="ticket.id">
            <div v-if="ticket.profile">
              <img :src="ticket.profile.picture" alt="">
              {{ ticket.profile.name }}
            </div>

          </div>
        </div>
        <div>
          <button @click="createComment()"> Commment
          </button>
          <textarea placeholder="leave a comment ..." name="comment here " id="CommentsHere"></textarea>
        </div>
        <div v-for="comment in comments" :key="comment.id">
          <div v-if="comment.creator">
            <div>{{ comment.body }}</div>

            <img :src="comment.creator.picture" alt="">
            {{ comment.creator.name }}
            <button @click="deleatComment(comment.id)">deleat</button>
          </div>

        </div>



      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>