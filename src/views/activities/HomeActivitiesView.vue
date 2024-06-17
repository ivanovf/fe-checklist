<template>
  <div class="flex border-b border-gray-200 my-4">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
        :class="{
          'text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500': selectedTab === tab,
          'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300': selectedTab !== tab
        }"
        class="inline-block p-4 rounded-t-lg"
      >
        {{ tab }}
      </button>
    </div>
    <div class="p-4">
      <div v-if="selectedTab === 'Eventos'">
        <div class="m-2 max-w-sm p-4 border-b border-slate-300 items-center flex flex-wrap" v-for="event in events" v-bind:key="event._id">
          <div class="basis-1/6">
            <img src="@/assets/icons/calendar.svg" width="15" alt="">
          </div>
          <div class="basis-3/6 text-left">
            <h4 class="text-md font-semibold">{{ event.type.name }}</h4>
            <h5>{{ getDay(event.date) }} de {{ getMonth(event.date) }}</h5>
          </div>
          <div class="basis-2/6 flex flex-row-reverse">
            <router-link class="ml-2"
              :to="{ name: 'activity-detail-delete', params: { id: event._id } }">
              <img src="@/assets/icons/delete.svg" width="25" alt="">
            </router-link>
            <router-link class="mr-2"
            :to="{ name: 'activity-detail-edit', params: { id: event._id } }">
            <img src="@/assets/icons/edit.svg" width="25" alt="">
            </router-link>
          </div>
        </div>

        <plus-button route="activity-detail-new"></plus-button>
      </div>
      <div v-if="selectedTab === 'Actividades'">
        <div class="m-2 max-w-sm p-4 border-b border-slate-300 items-center flex flex-wrap" v-for="type in activities" v-bind:key="type._id">
          <div class="basis-1/6">
            <img src="@/assets/icons/activity-white.svg" width="20" alt="">
          </div>
          <div class="basis-3/6">
            <h3 class="text-md font-semibold text-left">{{ type.name }}</h3>
          </div>
          <div class="basis-2/6 flex flex-row-reverse">
            <router-link class="ml-2"
            :to="{ name: 'activity-types-delete', params: { id: type._id } }">
            <img src="@/assets/icons/delete.svg" width="25" alt="">
            </router-link>
            <router-link class="mr-2"
              :to="{ name: 'activity-types-edit', params: { id: type._id } }">
              <img src="@/assets/icons/edit.svg" width="25" alt="">
            </router-link>
          </div>
        </div>
        <plus-button route="activity-types-new"></plus-button>
      </div>
    </div>
</template>

<script>
import PlusButton from '@/components/atoms/PlusButton.vue';

export default {
  components: { PlusButton },
  data() {
    return {
      tabs: ['Eventos', 'Actividades'],
      selectedTab: 'Eventos',
      events: [],
      activities: [],
    };
  },
  async mounted() {
    let response = await this.callEndpoints(this.axios, 'get', '/activity-type', localStorage.token);
    this.activities = response.data;

    response = await this.callEndpoints(this.axios, 'get', '/activity', localStorage.token);
    this.events = response.data;
  }
}
</script>
