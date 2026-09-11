<template>
  <div class="festival-page"><FestivalHeader /><main class="content-shell"><section class="page-intro compact"><p class="eyebrow">THE NETWORK / 003</p><h1>CLUBS<br><span>IN MOTION.</span></h1><p class="intro-copy">The communities behind the experiments. Explore their work, events, and the signals they are sending next.</p></section><section class="club-grid"><RouterLink v-for="club in store.state.clubs" :key="club.id" :to="`/clubs/${club.id}`" class="club-card" :style="{ '--club-accent': club.accent }"><span class="club-index">0{{ store.state.clubs.indexOf(club) + 1 }}</span><div class="club-symbol">{{ club.shortName.slice(0, 2) }}</div><h2>{{ club.name }}</h2><p>{{ club.description }}</p><span class="club-link">VIEW CLUB ↗</span></RouterLink></section></main></div>
</template>
<script setup>
import FestivalHeader from '../components/FestivalHeader.vue'
import { useContentStore } from '../data/contentStore'
const store = useContentStore()
</script>
