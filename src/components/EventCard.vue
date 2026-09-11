<template>
  <article class="event-card">
    <div class="event-card-top"><span class="eyebrow">DAY {{ event.day }} · {{ event.category }}</span><span class="event-mark">↗</span></div>
    <h3>{{ event.title }}</h3>
    <p>{{ event.description }}</p>
    <div class="event-meta"><span>{{ event.time }}</span><span>{{ event.venue }}</span></div>
    <a class="button button-lime" :href="event.registrationUrl" target="_blank" rel="noreferrer">REGISTER ↗</a>
  </article>
</template>

<script setup>
defineProps({ event: { type: Object, required: true } })
</script>
