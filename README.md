# Gummy Landing Page

A polished, Apple-glass style Next.js landing page for Gummy collaborative rooms.

## Features

- **Hero Section**: Focused on Gummy Rooms with crisp copy and CTAs
- **Feature Grid**: Multi-user rooms, fair queue, live streaming, thread isolation, live mirrors, mobile optimized, room copy
- **How It Works**: 3-step explainer (single link → private tabs + round-robin → live mirrored streams)
- **Join Room**: Nickname form with room URL handling and auto-generated room IDs
- **Apple-glass Design**: Modern glassmorphism with backdrop blur effects

## Routes

- `/` - Main landing page
- `/join` - Room joiner with nickname field and room URL input

## Assets Needed

Place these files in the `/public` folder:
- `gummy-logo.png` - Bag-of-gummy-candy mark logo
- Mobile mock screenshot (optional) - Replace placeholder device mock

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## GitHub Integration

The landing page includes links to:
- GitHub repository: https://github.com/bohselecta/gummy2
- Download/Install via GitHub releases

## Design System

- **Colors**: Gradient from slate-900 via purple-900 to slate-900
- **Typography**: Inter font family
- **Effects**: Backdrop blur, glassmorphism, subtle animations
- **Responsive**: Mobile-first design with Tailwind CSS
