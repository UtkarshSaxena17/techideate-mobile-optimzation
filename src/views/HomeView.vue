<template>
  <div class="home-shell">
    <ThreeScene />
    <div class="scene-ui">
      <div class="scene-brand">
        <span class="eyebrow">MANIPAL UNIVERSITY COLLEGE / 2026</span>
        <h1>OVERRIDE<span>26</span></h1>
        <p>THREE DAYS OF<br>TECHNICAL CURIOSITY.</p>
      </div>
      <nav class="scene-nav" aria-label="Festival navigation">
        <RouterLink to="/events">EVENTS ↗</RouterLink>
        <RouterLink to="/schedule">SCHEDULE ↗</RouterLink>
        <RouterLink to="/clubs">CLUBS ↗</RouterLink>
        <RouterLink to="/team">TEAM ↗</RouterLink>
      </nav>
      <div class="scene-cta"><RouterLink class="button button-lime" to="/events">EXPLORE EVENTS ↗</RouterLink></div>
    </div>
  </div>
</template>

<script setup>
import ThreeScene from '../components/ThreeScene.vue'
</script>
