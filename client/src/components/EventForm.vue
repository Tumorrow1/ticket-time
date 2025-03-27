<script setup>
import { router } from '@/router.js'
import { towerEventsService } from '@/services/TowerEventsService.js'
import { logger } from '@/utils/Logger.js'
import { Pop } from '@/utils/Pop.js'
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// const typs = [`concerts`, `digital`, `sport`, `convention`]

const route = useRouter()

const edditableEventData = ref({
  name: ``,
  description: ``,
  location: ``,
  coverImg: ``,
  capacity: ``,
  type: ``,
  startDate: ``,

})


async function createEvent() {
  try {
    const towerEvent = await towerEventsService.createEvent(edditableEventData.value)
    await towerEventsService.createEvent(edditableEventData.value)
    edditableEventData.value = {
      name: ``,
      description: ``,
      location: ``,
      coverImg: ``,
      capacity: ``,
      type: ``,
      startDate: ``,
    }
    Modal.getOrCreateInstance(`#exampleModal`).hide()
    router.push({ name: `Tower Events Details`, params: { eventsId: towerEvent.id } })
    // console.log(`event no make`)
  } catch (error) {
    Pop.error(error, `no create`)
    logger.error(`not able to create`, error)
  }
}
</script>


<template>
  <form @submit.prevent="createEvent()">
    <div>
      <input v-model="edditableEventData.name" type="text" class="form-control" id="eventName" placeholder="Name"
        maxlength="50" minlength="3" required>
      <label for="eventName">Event Name</label>
    </div>
    <div>
      <input v-model="edditableEventData.description" type="text" class="form-control" id="eventDescription"
        placeholder="descripton" maxlength="1000" minlength="2" required>
      <label for="eventDescription">Event description</label>
    </div>
    <div>
      <label for="start">Start date:</label>

      <input v-model="edditableEventData.startDate" type="date" id="start" name="trip-start" value="2018-07-22"
        min="2020-01-01" max="2025-12-31" />
    </div>
    <div>
      <input v-model="edditableEventData.location" type="text" class="form-control" id="eventLocation"
        placeholder="location" maxlength="50" minlength="3" required>
      <label for="eventLocation">Event Location</label>
    </div>
    <div>
      <input v-model="edditableEventData.coverImg" type="url" class="form-control" id="eventCoverImg"
        placeholder="ImgUrl" maxlength="1000" required>
      <label for="eventImgUrl">Event Image</label>
    </div>
    <div>
      <input v-model="edditableEventData.capacity" type="number" class="form-control" id="eventCapacity"
        placeholder="Capacity" maxlength="5000" minlength="1" required>
      <label for="eventImgUrl">Event Image</label>
    </div>
    <select v-model="edditableEventData.type" class="form-control" id="towerEventType">
      <option value="sport">
        sport
      </option>
      <option value="concert">
        concert
      </option>
      <option value="digital">
        digital
      </option>
      <option value="convention">
        convention
      </option>

    </select>
    <button class="btn btn-success" type="submit">submit</button>
  </form>

</template>


<style lang="scss" scoped></style>