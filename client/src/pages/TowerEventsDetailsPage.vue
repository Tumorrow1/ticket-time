<script setup>

import { AppState } from '@/AppState.js';
import { TowerEvent } from '@/models/TowerEvent.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const activeEvent = computed(() => AppState.towerEvent)



onMounted(() => {
  getTowerEventsById()

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

async function cancelEvent() {
  try {
    console.log(`cancel`, activeEvent.value.id)
    await towerEventsService.cancelEvent(activeEvent.value.id)
  } catch (error) {
    Pop.error(error, `no shq`)
  }
}

</script>


<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-if="activeEvent">
          <h1>{{ activeEvent.name }}</h1>
        </div>
        <div>
          <div v-if="activeEvent" class="card" style="width: 18rem;">
            <img :src="activeEvent.coverImg" class="card-img-top" :alt="activeEvent.name">
            <div class="card-body">
              <p class="card-text">{{ activeEvent.description }}</p>
              <span>{{ activeEvent.ticketCount }}</span>
            </div>
            <div><button @click="cancelEvent()" class="btn btn-danger">Event
                {{ activeEvent.isCanceled ? `is not canceled` : `is canceled` }}

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>