import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import ClubsView from '../views/ClubsView.vue'
import ClubDetailView from '../views/ClubDetailView.vue'
import TeamView from '../views/TeamView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/events', name: 'events', component: EventsView },
  { path: '/schedule', name: 'schedule', component: ScheduleView },
  { path: '/clubs', name: 'clubs', component: ClubsView },
  { path: '/clubs/:slug', name: 'club-detail', component: ClubDetailView },
  { path: '/team', name: 'team', component: TeamView },
  { path: '/admin', name: 'admin', component: AdminView },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
