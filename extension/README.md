# SomniWatch Chrome Extension

Sync YouTube, Dailymotion, Vimeo & Twitch with your partner — privately.

## Setup (Development / Testing)

### Step 1 — Get socket.io client
Download the minified socket.io client and save as `socket.io.min.js` in this folder:
```
https://cdn.socket.io/4.7.5/socket.io.min.js
```
Or run from the project root:
```bash
curl -o extension/socket.io.min.js https://cdn.socket.io/4.7.5/socket.io.min.js
```

### Step 2 — Add icons
Create an `icons/` folder and add three PNG icons:
- `icon16.png` — 16×16px
- `icon48.png` — 48×48px  
- `icon128.png` — 128×128px

You can use any image — a simple dark square with 🎬 or the SomniWatch logo.

### Step 3 — Load in Chrome
1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer Mode** (top right toggle)
3. Click **Load unpacked**
4. Select this `extension/` folder
5. Extension appears in toolbar

### Step 4 — Use it
1. Go to a YouTube video
2. Click the SomniWatch extension icon
3. Enter your name → click **Start Watch Party**
4. Share the room code with your partner
5. Partner installs extension, enters code, knocks
6. You accept → both are synced!

## How it works
- Content script hooks the `<video>` element on supported sites
- Emits `sync_play`, `sync_pause`, `sync_seek` to your SomniWatch server
- Same sync protocol as the web app — fully compatible
- Partners on the **web app** and **extension** can be in the same room

## Supported Sites
- ✅ YouTube (youtube.com)
- ✅ Dailymotion (dailymotion.com)
- ✅ Vimeo (vimeo.com)
- ✅ Twitch (twitch.tv)

## Publishing to Chrome Web Store
1. Zip the entire `extension/` folder
2. Go to https://chrome.google.com/webstore/devconsole
3. Pay one-time $5 developer fee
4. Upload zip → fill in store listing
5. Submit for review (~3-7 days)
