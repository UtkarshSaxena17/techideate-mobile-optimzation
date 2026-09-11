<template>
  <div class="festival-page"><FestivalHeader /><main class="content-shell"><section class="page-intro compact"><p class="eyebrow">THE THREE-DAY SIGNAL / 002</p><h1>THE<br><span>RUN OF SHOW.</span></h1></section><div class="day-tabs"><button v-for="day in 3" :key="day" :class="{ active: selectedDay === day }" @click="selectedDay = day">DAY 0{{ day }}</button></div><section class="schedule-list"><article v-for="event in store.getEventsForDay(selectedDay)" :key="event.id" class="schedule-row"><strong>{{ event.time }}</strong><div><span class="eyebrow">{{ event.category }} / {{ event.venue }}</span><h2>{{ event.title }}</h2><p>{{ event.description }}</p></div><a :href="event.registrationUrl" target="_blank" rel="noreferrer">REGISTER ↗</a></article></section></main></div>
</template>
<script setup>
import { ref } from 'vue'
import FestivalHeader from '../components/FestivalHeader.vue'
import { useContentStore } from '../data/contentStore'
const store = useContentStore(); const selectedDay = ref(1)
</script>
