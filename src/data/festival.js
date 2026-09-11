export const festival = {
  name: 'TECHIDEATE',
  edition: '2026',
  tagline: 'Build what comes next.',
  dates: '14 - 16 OCTOBER 2026',
  venue: 'Manipal University College',
  location: 'Manipal, Karnataka',
  email: 'hello@techideate.in'
}

export const clubs = [
  {
    id: 'gdsc',
    name: 'Google Developer Student Club',
    shortName: 'GDSC',
    description: 'Builders, problem-solvers, and curious minds shaping useful technology together.',
    accent: '#00a8ff',
    status: 'approved',
    social: '@gdscmanipal'
  },
  {
    id: 'acm',
    name: 'ACM Student Chapter',
    shortName: 'ACM',
    description: 'A community for algorithms, systems, research, and the joy of making computers do more.',
    accent: '#c8ff00',
    status: 'approved',
    social: '@acmmanipal'
  },
  {
    id: 'robotics',
    name: 'Robotics and Automation Club',
    shortName: 'RAC',
    description: 'Hardware, autonomous systems, and machines designed to leave the screen behind.',
    accent: '#6d5cff',
    status: 'approved',
    social: '@racmanipal'
  },
  {
    id: 'cipher',
    name: 'Cipher Security Club',
    shortName: 'CIPHER',
    description: 'Security research, capture-the-flag challenges, and a sharper way to think about trust.',
    accent: '#d9e0e8',
    status: 'approved',
    social: '@cipher.muc'
  }
]

export const events = [
  { id: 'hacknight', clubId: 'gdsc', title: 'Hacknight 2.0', category: 'BUILD', day: 1, time: '10:00 - 18:00', venue: 'Innovation Lab', description: 'A full-day build sprint for teams turning a stubborn problem into a working prototype.', registrationUrl: 'https://example.com/register/hacknight' },
  { id: 'cyber-ops', clubId: 'cipher', title: 'Cyber Ops', category: 'SECURITY', day: 1, time: '13:00 - 16:00', venue: 'Block C · Lab 4', description: 'A timed capture-the-flag arena for curious attackers and careful defenders.', registrationUrl: 'https://example.com/register/cyber-ops' },
  { id: 'robo-rumble', clubId: 'robotics', title: 'Robo Rumble', category: 'HARDWARE', day: 2, time: '09:30 - 13:30', venue: 'Main Quadrangle', description: 'Design, drive, and debug your way through a kinetic arena of challenges.', registrationUrl: 'https://example.com/register/robo-rumble' },
  { id: 'design-futures', clubId: 'acm', title: 'Design Futures', category: 'DESIGN', day: 2, time: '15:00 - 17:00', venue: 'Design Studio', description: 'A rapid visual language workshop for digital products with a point of view.', registrationUrl: 'https://example.com/register/design-futures' },
  { id: 'ai-arena', clubId: 'gdsc', title: 'AI Arena', category: 'AI / ML', day: 3, time: '10:00 - 14:00', venue: 'Seminar Hall 2', description: 'Model, test, and explain a machine-learning solution under a live brief.', registrationUrl: 'https://example.com/register/ai-arena' },
  { id: 'open-source', clubId: 'acm', title: 'Open Source Relay', category: 'COMMUNITY', day: 3, time: '16:00 - 18:30', venue: 'Student Plaza', description: 'Collaborate across projects and leave the festival with a contribution that ships.', registrationUrl: 'https://example.com/register/open-source' }
]

export const team = [
  { name: 'Aarav Menon', role: 'Festival Convenor', group: 'Leadership', initials: 'AM' },
  { name: 'Ishita Rao', role: 'Head of Operations', group: 'Executive Committee', initials: 'IR' },
  { name: 'Rohan Shah', role: 'Technical Director', group: 'Executive Committee', initials: 'RS' },
  { name: 'Meera Nair', role: 'Creative Director', group: 'Organising Team', initials: 'MN' }
]

export const promotions = clubs.map((club, index) => ({
  id: `promo-${club.id}`,
  clubId: club.id,
  title: events[index % events.length].title,
  status: 'approved',
  displayOrder: index + 1,
  accent: club.accent
}))
