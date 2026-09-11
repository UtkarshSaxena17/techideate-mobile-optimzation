<template>
  <div class="festival-page">
    <FestivalHeader />
    <main class="content-shell">
      <section class="page-intro"><p class="eyebrow">THE EVENT INDEX / 001</p><h1>MAKE<br><span>NOISE.</span></h1><p class="intro-copy">Three days of technical experiments, hard problems, bright ideas, and the people who make them real.</p></section>
      <section class="event-grid"><EventCard v-for="event in store.state.events" :key="event.id" :event="event" /></section>
    </main>
  </div>
</template>
<script setup>
import FestivalHeader from '../components/FestivalHeader.vue'
import EventCard from '../components/EventCard.vue'
import { useContentStore } from '../data/contentStore'
const store = useContentStore()
</script>
