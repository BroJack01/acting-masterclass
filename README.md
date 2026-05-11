# Joelhood Acting Master Class — Lesson Player

**Joelhood Pictures Limited**
Acting Master Class · Delivery System · GitHub Pages

---

## Repository Structure

```
/
├── index.html          ← The lesson player (single file)
├── lessons/
│   ├── P0L0.json       ← Orientation
│   ├── P1L1.json       ← Phase 1 Lesson 1
│   ├── P1L2.json
│   ├── P1L3.json
│   ├── P1L4.json
│   ├── P2L0.json       ← Phase 2 Lesson 0
│   ├── P2L1.json
│   ├── P2L2.json
│   ├── P2L3.json
│   ├── P2L4.json
│   ├── P3L1.json       ← Phase 3
│   ├── P3L2.json
│   ├── P3L3.json
│   ├── P3L4.json
│   ├── P3L5.json
│   ├── P4L1.json       ← Phase 4
│   ├── P4L2.json
│   ├── P4L3.json
│   ├── P4L4.json
│   ├── P4L5.json
│   └── P4L6.json
└── README.md
```

---

## Setup Instructions

### Step 1 — Create the GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **New repository** (top right, + icon)
3. Name it: `acting-masterclass` (or any name you prefer)
4. Set to **Public**
5. Do NOT initialise with README — you will upload files
6. Click **Create repository**

---

### Step 2 — Upload the Files

**Option A — GitHub Web Interface (easiest, no coding required)**

1. On your new empty repository page — click **uploading an existing file**
2. Drag and drop `index.html` into the upload area
3. Click **Commit changes**
4. Now create the lessons folder:
   - Click **Add file → Create new file**
   - In the filename box type: `lessons/P0L0.json`
   - Paste the contents of `P0L0.json`
   - Click **Commit new file**
   - Repeat for every lesson JSON file (P0L0 through P4L6)

**Option B — GitHub Desktop (faster for many files)**

1. Download [GitHub Desktop](https://desktop.github.com)
2. Clone your new repository to your computer
3. Copy `index.html` and the entire `lessons/` folder into the cloned folder
4. In GitHub Desktop — commit and push

---

### Step 3 — Enable GitHub Pages

1. In your repository — click **Settings** (top tab)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source** — select **Deploy from a branch**
4. Branch: **main** · Folder: **/ (root)**
5. Click **Save**
6. Wait 2–3 minutes
7. GitHub will show your URL: `https://yourusername.github.io/acting-masterclass`

**Copy that URL.** You need it in two places.

---

### Step 4 — Update the Cloudflare Worker

In your Cloudflare Worker settings → Variables:
- Set `PLAYER_ORIGIN` to your GitHub Pages URL (e.g. `https://yourusername.github.io`)

---

### Step 5 — Update the GAS Script

In your Google Apps Script (`Code.gs`):
- Set `PLAYER_URL` to your full GitHub Pages URL including repository name
  e.g. `https://yourusername.github.io/acting-masterclass`
- Save and **redeploy** (Deploy → Manage deployments → edit → new version → deploy)

---

### Step 6 — Test the Full Flow

1. Submit a test entry through your Google Form
2. Check your admin email for the alert + WhatsApp button
3. Check the test student email for the welcome + lesson link
4. Click the lesson link — the player should load
5. Scroll through the lesson to the requirement section
6. Submit a test post URL with the correct hashtag
7. Confirm the next lesson unlocks automatically

---

## Updating a Lesson

To update any lesson after publishing:

1. Go to your GitHub repository
2. Click into the `lessons/` folder
3. Click the lesson file you want to edit (e.g. `P1L1.json`)
4. Click the pencil icon (Edit)
5. Make your changes
6. Click **Commit changes**

The live player picks up the change within seconds. No redeployment needed.

---

## How the System Works

```
Student fills Google Form
         ↓
GAS fires — writes student to sheet, sends emails
         ↓
Student receives email with link:
https://yourusername.github.io/acting-masterclass?token=XXXXX
         ↓
GitHub Pages loads index.html
         ↓
Player calls Cloudflare Worker: /progress?token=XXXXX
         ↓
Worker calls GAS privately — returns student position
         ↓
Player fetches lesson JSON from GitHub Pages: /lessons/P0L0.json
         ↓
Lesson displays in screenplay format
         ↓
Student reads, posts on social media, submits URL + hashtag
         ↓
Player calls Worker: POST /submit
         ↓
Worker validates hashtag + URL → calls GAS to update sheet
         ↓
Next lesson unlocks automatically
         ↓
At phase end — GAS emails student (payment gate) + emails you (WhatsApp nudge)
         ↓
You receive payment → update sheet (Phase X Paid = TRUE)
         ↓
GAS auto-sends student their phase unlock email
         ↓
Student continues
```

---

## Payment Flow

When a student completes a phase:
1. They receive an automatic email with payment instructions
2. You receive an alert email with a **Send WhatsApp Nudge** button
3. Student pays via MoMo
4. You open the Google Sheet → find the student's row → change `Phase X Paid` to `TRUE`
5. GAS detects the edit → automatically sends the student their phase unlock email
6. Student clicks the link → next phase begins

**You do not need to generate or send any links manually. One cell edit does everything.**

---

## Contacts

Joelhood Pictures Limited
209 Timothy Gondwe Road, Musamba Township, Chilanga, Lusaka
joelhoodpictures@ymail.com
+260 967 897 668 / +260 977 858 275

---

*Joackim Joel Sakala ©2026. All Rights Reserved.*
