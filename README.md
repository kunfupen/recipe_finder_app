# Recipe Finder App

A responsive recipe search app that lets users look up meals, browse recipe cards, and open detailed cooking instructions using TheMealDB API.

Live app: https://recipe-571-46869654728.us-central1.run.app/

## Features

- Search recipes by meal name or keyword.
- Display recipe cards with images and category badges.
- Open a detailed recipe view with ingredients, measurements, instructions, cuisine area, and a YouTube link when available.
- Handles empty searches, loading states, no-result states, and API errors.
- Runs as a static frontend served by Nginx.

## Project Structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── docs/
│   └── process_log.txt
├── Dockerfile
├── nginx.conf
└── README.md
```

## Tech Stack

- HTML
- CSS
- JavaScript
- TheMealDB API
- Nginx
- Docker

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static file server.

## Docker

```bash
docker build -t recipe-finder-app .
docker run -p 8080:8080 recipe-finder-app
```

Then open:

```text
http://localhost:8080
```

## Development Notes

The AI-assisted development log is available in [docs/process_log.txt](docs/process_log.txt).
