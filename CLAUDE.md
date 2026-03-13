# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Music search application built with Next.js App Router + React + TypeScript. Uses Spotify Web API to fetch popular songs and search tracks.

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## Architecture

### Tech Stack
- Next.js 15 App Router
- React 18 + TypeScript
- Tailwind CSS
- FontAwesome for icons

### Key Directories
- `src/app/` - App Router pages and API routes
- `src/app/_components/` - UI components (`SearchSection`, `SongList`, `ErrorModal` etc.)
- `src/app/api/spotify/` - Spotify API route handlers
- `src/lib/` - Spotify API utilities and type definitions

### Spotify API Integration
The app authenticates via Spotify Client Credentials flow:
1. `src/lib/spotify.ts` - Reads Spotify credentials and manages access tokens
2. `src/app/api/spotify/popular/route.ts` - Fetches a curated playlist for initial display
3. `src/app/api/spotify/search/route.ts` - Searches tracks by keyword

### Environment Variables
Required in `.env`:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
