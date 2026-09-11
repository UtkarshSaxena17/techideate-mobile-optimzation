<template>
  <div class="festival-page"><FestivalHeader /><main v-if="club" class="content-shell club-detail"><RouterLink class="back-link" to="/clubs">← ALL CLUBS</RouterLink><section class="club-detail-hero" :style="{ '--club-accent': club.accent }"><p class="eyebrow">PARTICIPATING CLUB / {{ club.shortName }}</p><h1>{{ club.name }}</h1><p>{{ club.description }}</p><span>{{ club.social }}</span></section><section><div class="section-heading"><p class="eyebrow">THEIR EVENTS</p><h2>WHAT THEY<br>ARE BUILDING.</h2></div><div class="event-grid"><EventCard v-for="event in store.getEventsForClub(club.id)" :key="event.id" :event="event" /></div></section></main></div>
</template>
<script setup>
import FestivalHeader from '../components/FestivalHeader.vue'
import EventCard from '../components/EventCard.vue'
import { useRoute } from 'vue-router'
import { useContentStore } from '../data/contentStore'
const store = useContentStore(); const route = useRoute(); const club = store.getClub(route.params.slug)
</script>
