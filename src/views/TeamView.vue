<template>
  <div class="festival-page"><FestivalHeader /><main class="content-shell"><section class="page-intro compact"><p class="eyebrow">THE PEOPLE SYSTEM / 004</p><h1>THE<br><span>CREW.</span></h1><p class="intro-copy">A festival this large is a shared system. Meet the people keeping its signal clear.</p></section><section class="team-grid"><article v-for="member in store.state.team" :key="member.name" class="team-card"><div class="avatar">{{ member.initials }}</div><span class="eyebrow">{{ member.group }}</span><h2>{{ member.name }}</h2><p>{{ member.role }}</p></article></section></main></div>
</template>
<script setup>
import FestivalHeader from '../components/FestivalHeader.vue'
import { useContentStore } from '../data/contentStore'
const store = useContentStore()
</script>
