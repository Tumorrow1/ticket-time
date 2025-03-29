<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { ticketsService } from '@/services/TicketsService.js';

const account = computed(() => AppState.account)
const myTickets = computed(() => AppState.tickets)


onMounted(() => {
  getMyTickets()

})

async function getMyTickets() {
  try {
    console.log(`my ticket`)
    await ticketsService.getMyTickets()
  } catch (error) {
    Pop.error(error, `not my ticket`)
  }
}

async function deleatTicket(ticketId) {
  try {
    await ticketsService.deleatTicket(ticketId)
    console.log(`deleat son`, ticketId)

  } catch (error) {
    Pop.error(error, `not deleat `)
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>

    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
  <div class="row">
    <div class="col-12 text-centerjustify-content-between">

      <div class="d-flex " v-for="ticket in myTickets" :key="ticket.id">
        <div v-if="ticket.event">
          <div class="text-center align-items-center">
            {{ ticket.event.name }}
          </div>
          <span><button @click="deleatTicket(ticket.id)">deleat</button></span>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
