# CinemaSync 🎬

A real-time watch party web application. Watch movies together, synchronized, from anywhere.

## Features

- **Synchronized Playback** — play, pause, seek stays in sync across all viewers
- **Multi-source Video** — direct MP4/WebM URLs, YouTube, Vimeo, Dailymotion, Archive.org, local files
- **Live Chat** — real-time messages with timestamps
- **Emoji Reactions** — animated floating reactions
- **Countdown Sync** — 3-2-1 countdown before playback starts
- **Archive.org Search** — search and stream thousands of free movies
- **Webpage Scraper** — paste any webpage URL to auto-extract its video

---

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open your browser
http://localhost:3001
```

## Share with a Remote Partner via ngrok

```bash
# Install ngrok: https://ngrok.com/download
ngrok http 3001

# Share the generated HTTPS URL with your partner
# e.g. https://abc123.ngrok.io
```

Both of you open the URL → one creates a room, shares the 6-character code → partner enters the code → you're synced.

---

## Deploy to Railway

1. Push this folder to a GitHub repository
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your repo — Railway auto-detects Node.js
4. Set environment variable `PORT` if needed (Railway sets it automatically)
5. Your app will be live at a `*.railway.app` URL

## Deploy to Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo
4. Build command: `npm install`
5. Start command: `node server.js`
6. Deploy — free tier available

---

## Free Movie Sources That Work

| Source | Notes |
|--------|-------|
| **archive.org** | Thousands of public domain films — use the in-app search |
| `https://archive.org/download/IDENTIFIER/IDENTIFIER.mp4` | Direct MP4 links |
| **Internet Archive details pages** | Paste the URL — the scraper extracts the video |
| **Vimeo** | Paste any public Vimeo URL into the Vimeo tab |
| **YouTube** | Paste URL into the YouTube tab |
| **Dailymotion** | Paste URL into the Dailymotion tab |
| **Direct .mp4 files** | Any publicly accessible direct video URL |

### Example Archive.org movies to try:
- `https://archive.org/details/night_of_the_living_dead` — Night of the Living Dead (1968)
- `https://archive.org/details/Metropolis1927` — Metropolis (1927)
- `https://archive.org/details/the_general_1926` — The General (1926, Buster Keaton)
- `https://archive.org/details/CharlieChapleGoldRush` — The Gold Rush (Charlie Chaplin)

---

## Tech Stack

- **Backend**: Node.js, Express, Socket.io
- **Video Extraction**: axios + cheerio
- **Frontend**: Vanilla JS, single HTML file
- **No database** — all state in memory, rooms are ephemeral
