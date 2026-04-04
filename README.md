# Tekentool Betonvloer

![Tekentool Betonvloer screenshot](https://github.com/user-attachments/assets/e43b9cc2-fd3c-4e56-93c9-04e022784769)

A floor plan drawing tool for planning plumbing, electrical, water, and structural components in a concrete floor (betonvloer). Built with [tldraw](https://tldraw.dev/) as an interactive canvas.

## Features

- **14 x 4 meter canvas** with a locked floor plan background
- **Drag & drop** components from the sidebar onto the canvas, or click to place them in the center
- **Component categories:** rioolafvoer, hemelwaterafvoer, elektra, wateraanvoer, and overig (walls, doors, windows)
- **Draw connections** between components using tldraw's built-in line and arrow tools
- **Toggle labels** on/off for placed components
- **Save/load** floor plans as JSON files
- **Persistent state** via tldraw's local storage persistence

## Getting Started

```sh
npm install
npm run dev
```

## Tech Stack

- React 19 + TypeScript
- [tldraw](https://tldraw.dev/) (canvas & shape engine)
- Vite
