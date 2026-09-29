TECHIDEATE CITY SCREENS - HOW TO UPDATE
=======================================

Open GUIDE.png first. It shows every screen number and where it is in the city.

  V01 - V10  = 10 VIDEO screens (major events), the most visible screens in the
               starting view (V01 = the big neon screen above the centre)
  P01 - P26  = 26 POSTER screens (club events), they rotate
  Lower number = more visible when the site opens (V01 / P01 are the most visible).
  CENTRE SCREEN: plays the team video (public/cdn/akira.mp4) on the normal view,
  and slides through the 10 major events when someone opens EVENTS.

Everything is controlled by ONE file: screens.json (in this folder).


1. CHANGE A MAJOR EVENT VIDEO
-----------------------------
  a) Put the video in  screens/videos/   e.g.  videos/robowars.mp4
       - 10 seconds, loops
       - 16:9, 1280x720 (on very wide screens it is shown with dark side bars, not cut)
       - MP4, no sound
       - under 3 MB if possible
  b) In screens.json, find "majorEvents" and edit the block for that screen:
       { "screen": "V01", "name": "RoboWars", "club": "Robotics Club",
         "date": "2026-10-14", "time": "10:00", "video": "videos/robowars.mp4",
         "description": "Robot combat arena",
         "details": "Longer text shown when people click INFOS in the Events section.",
         "registerUrl": "https://your-registration-link" }
  The same 10 major events also appear in the EVENTS section slider (centre screen),
  in the same order as in the file, with their video, description and details.
  The VISIT button there opens registerUrl.


2. ADD OR CHANGE A CLUB EVENT POSTER
------------------------------------
  a) Put the poster images in  screens/posters/
       - tall version  1:2  (e.g. 800x1600)
       - wide version  2:1  (e.g. 1600x800)
       - JPG, under 300 KB each if possible
       - keep important text in the MIDDLE (edges can get cropped a little)
       - if you only have one version, fill just one; it will be used everywhere
  b) In screens.json, add/edit a block in "clubEvents":
       { "club": "Coding Club", "event": "Code Sprint",
         "date": "2026-10-15", "time": "14:00",
         "posterTall": "posters/coding-tall.jpg",
         "posterWide": "posters/coding-wide.jpg" }
  You do NOT pick a screen for posters. The site sorts them by date/time:
       upcoming events  -> screens closest to the centre (P01, P02 ...)
       finished events  -> outer screens, still shown for marketing
  An event counts as "finished" eventLengthHours (default 3) after its start time.


3. OTHER SETTINGS (top of screens.json)
---------------------------------------
  posterSwitchSeconds   how often each poster screen switches (default 8)
  eventLengthHours      how long after the start an event counts as finished (default 3)
  videosPlayingAtOnce   how many nearby videos play at the same time
                        (desktop 4, phone 2 - keeps phones smooth)
  testNow               leave "" normally. To preview the order on a certain day,
                        put e.g. "2026-10-15T12:00" then set it back to "".


4. PUBLISH
----------
  git add public/screens
  git commit -m "Update screens"
  git push mine test-branch-2:main
  Vercel updates the live site in 1-2 minutes. Refresh with Ctrl + Shift + R.


TIPS
----
  - screens.json must stay valid JSON: keep the quotes and commas exactly like the
    examples. If the site shows only "TECHIDEATE" placeholders on the screens,
    paste screens.json into jsonlint.com to find the mistake.
  - File names: use small letters, no spaces (robowars.mp4, not "Robo Wars.mp4").
  - All current videos and posters are PLACEHOLDERS. Replace them when the real ones are ready.
