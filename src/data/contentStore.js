import { clubs as seedClubs, events as seedEvents, promotions as seedPromotions, team as seedTeam, festival } from './festival'

const state = {
  clubs: [...seedClubs],
  events: [...seedEvents],
  promotions: [...seedPromotions],
  team: [...seedTeam],
  festival
}

export function useContentStore() {
  return {
    state,
    getClub(id) { return state.clubs.find((club) => club.id === id) },
    getEventsForClub(id) { return state.events.filter((event) => event.clubId === id) },
    getEventsForDay(day) { return state.events.filter((event) => event.day === day) },
    approvedPromotions() { return state.promotions.filter((promotion) => promotion.status === 'approved').sort((a, b) => a.displayOrder - b.displayOrder) },
    addEvent(event) { state.events.push({ ...event, id: `event-${Date.now()}` }) },
    updateClub(id, patch) { const club = this.getClub(id); if (club) Object.assign(club, patch) },
    updatePromotion(id, patch) { const promotion = state.promotions.find((item) => item.id === id); if (promotion) Object.assign(promotion, patch) }
  }
}
