# Caching API

A simple ExpressJs API that caches data fetched from external APIs (GitHub, YouTube, VS Code Marketplace).

## Purpose
This API serves as a caching layer to avoid hitting rate limits on external APIs and to speed up the portfolio website by serving pre-fetched data.

## How it works
- A Python script (`scripts/UpdateProjectsStats.py`) runs periodically via cron job to fetch fresh data from external APIs
- The data is stored in `data/stats.json`
- The Express API reads from this JSON file and serves the data to the portfolio

## Endpoints
- `GET /` - Health check
- `GET /projects/:name/stats` - Get cached stats for a project

## Running locally
```bash
nx serve caching-api
```

## Updating stats
```bash
cd apps/caching-api/scripts
python UpdateProjectsStats.py
```
