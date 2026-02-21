

# 💐 "Bouquet & My Lady" — Romantic Hidden-Mode Experience

A single-page React app with two modes: a serene public "Bouquet" view and a hidden "My Lady" private mode with a Tame Impala / TV Girl aesthetic.

---

## Phase 1: The Public "Bouquet" View

### Background & Atmosphere
- Soft cream (#FDFCF0) background with a CSS grain/noise texture overlay
- Fonts: **Playfair Display** for headings, **Inter** for body text (loaded via Google Fonts)

### The Blooming Lily (Hero)
- A center-aligned SVG lily flower with individually animated petals
- As the user scrolls, petals expand outward using Framer Motion's `useScroll` + `useTransform` — giving the feeling of the flower opening up
- Smooth, performant scroll-linked animation

### The Easter Egg
- Long-pressing the center of the lily triggers a **golden egg emoji** (🥚✨) that pulses briefly and fades out
- Subtle and delightful — a small surprise

### The Hidden Key
- A tiny, minimalist **2×2 Lego brick** icon sits in the bottom-right corner
- Nearly invisible — only noticeable if you know to look for it
- Clicking it triggers the transformation to Private Mode

---

## Phase 2: The "My Lady" Transformation

### Circle Expansion Transition
- When the Lego brick is clicked, a **circle expands from the brick's position** to cover the entire screen
- Uses Framer Motion's `clipPath` animation for a smooth reveal

### New Theme
- Background: Psychedelic gradient (`linear-gradient(45deg, #ff71ce, #01cdfe, #05ffa1, #b967ff, #fffb96)`)
- SVG noise/grain filter overlay for that album-art aesthetic
- Deep purples, sunset pinks — the "Tame Impala / TV Girl" vibe

### New Heading
- **"My Lady"** in Playfair Display serif font, elegantly animated in

---

## Phase 3: Private Mode Content

### 🎵 The Vinyl Player
- A rotating vinyl record component with realistic grooves
- Displays track names: **"Lovers Rock — TV Girl"** and **"Piece of Heaven — Tame Impala"**
- The record sleeve serves as a **photo placeholder** (you'll upload the actual photo)
- **Touch-draggable** on mobile — drag to spin the record
- **Audio playback**: Tapping a track name or interacting with the record plays embedded audio (you'll upload the audio files)
- Spinning animation syncs with playback state

### 🧱 The Lego Gallery
- A grid of **12 photo slots** (you'll upload the actual photos)
- Each photo is framed in a container styled like a **Lego baseplate** — using `repeating-radial-gradient` for realistic "studs" on the borders
- **Mobile layout**: 2-column masonry-style gallery for easy scrolling
- **Desktop**: 3-column layout
- Smooth fade-in animations as photos enter the viewport

### 📊 The "6-Month" Stat Card
- A **glassmorphism card** (frosted glass effect with backdrop blur)
- Displays:
  - **Days together:** 180+
  - **Shows attended:** Tame Impala
  - **Current Status:** Golden
- Subtle floating/breathing animation

---

## Design & Technical Details

- **Mobile-first** responsive design throughout
- **Framer Motion** powers all animations: scroll-linked bloom, circle transition, vinyl spin, gallery reveals
- **State resets on refresh** — always starts in the Bouquet view
- **No backend needed** — purely frontend, photos and audio served as static assets

