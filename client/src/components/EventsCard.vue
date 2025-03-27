<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';




defineProps({
  towerEvent: { type: TowerEvent, required: true }
})
</script>


<template>
  <RouterLink :to="{ name: `Tower Events Details`, params: { eventsId: towerEvent.id } }">

    <div class="card d-flex">
      <img :src="towerEvent.coverImg" class="card-img-top" :alt="towerEvent.name">
      <div class="card-body">
        <p class="card-text">{{ towerEvent.description }}</p>

        <span>{{ towerEvent.ticketCount }}</span>
        <div>
        </div>
      </div>
    </div>

  </RouterLink>

</template>


<style lang="scss" scoped></style>