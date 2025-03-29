<script setup>
import { AppState } from '@/AppState.js';
import EventsCard from '@/components/EventsCard.vue';
import ModalComponent from '@/components/ModalComponent.vue';

import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';



const displaytowerevents = computed(() => {
  if (filterType.value == `all`) {
    return AppState.towerEvents
  }
  return AppState.towerEvents.filter(towerEvent => towerEvent.type == filterType.value)
})

const filterType = ref(`all`)

// TODO i need to go back to all

const types = [
  {
    name: `concert`

  },
  {
    name: `convention`

  },
  {
    name: `sport`

  },
  {
    name: `digital`

  },
  {
    name: `all`

  },
]

onMounted(() => {
  getTowerEvents()
})



async function getTowerEvents() {
  try {
    await towerEventsService.getTowerEvents()
  } catch (error) {
    Pop.error(error, `got no albums`)
    logger.error(`No events Mans`, error)
  }
}

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <span>find your shaq</span>
      </div>
    </div>
    <div class="row">
      <div v-for="type in types" :key="type.name">
        <div @click="filterType = type.name" class="p-4 fs-3 fw-bold text-center rounded type-button">
          {{ type.name }}
        </div>

      </div>
      <div class="justify-content-between d-flex">

      </div>
    </div>
    <div class="text-center">
      <ModalComponent />
    </div>

    <div class="row">
      <div class="col-12 text-center">
        <span class="fs-1 fw-bold">Shaq Events</span>
      </div>
    </div>
    <div class="row">
      <div v-for="towerEvent in displaytowerevents" :key="towerEvent.id">
        <EventsCard :towerEvent="towerEvent" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
