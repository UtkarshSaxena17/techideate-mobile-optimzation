# OVERRIDE 26

Interactive technology-fest website for Manipal University College. The public homepage uses the original WebGL scene as its visual environment, with festival navigation, events, schedule, clubs, team, and a local content-control prototype.

## Requirements

- Node.js 20 or newer
- npm
- Git
- Opera or Chrome for the WebGL/WebGPU scene

## Clone And Run

```bash
git clone https://github.com/RishitSethi09099/Techideate-.git
cd Techideate-
npm install
npm run dev
```

Open `http://localhost:5173` in the browser. Test the production build with:

```bash
npm run build
```

## Public Routes

- `/` interactive OVERRIDE 26 homepage
- `/events` event list and registration links
- `/schedule` three-day schedule
- `/clubs` participating clubs
- `/clubs/:slug` club details and events
- `/team` festival leadership
- `/admin` local content-control prototype

## Collaborator Branch Workflow

Do not make changes directly on `main`. Each collaborator should use a separate descriptive branch.

Start with the latest `main`:

```bash
git checkout main
git pull origin main
```

Create a branch for your work:

```bash
git checkout -b feature/update-event-schedule
```

Suggested names include `feature/add-club-promotion`, `fix/mobile-navigation`, and `content/update-event-list`.

After making and testing changes:

```bash
npm run build
git status
git diff
git add src public README.md
git commit -m "Add updated event schedule"
git push -u origin feature/update-event-schedule
```

Open GitHub and create a pull request from your branch into `main`. A collaborator should review it before merging. Keep working only on your branch until the pull request is merged.

## Updating A Branch

```bash
git checkout main
git pull origin main
git checkout feature/update-event-schedule
git merge main
npm install
npm run build
```

Resolve conflicts, test again, then run:

```bash
git add .
git commit -m "Resolve merge conflicts"
git push
```

## Content And Media

Seed festival content is in `src/data/festival.js`. The local adapter is in `src/data/contentStore.js`. The billboard video is stored at `public/cdn/akira.mp4`.

The current admin route uses local mock data. Supabase authentication, database persistence, storage uploads, and server-side role permissions should be added before production use.

## Environment Variables

Copy `.env.example` to `.env` when backend configuration is introduced:

```powershell
Copy-Item .env.example .env
```

Never commit `.env` or service-role keys.
