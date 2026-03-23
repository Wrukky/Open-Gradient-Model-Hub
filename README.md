# Open Gradient Model Hub

A visual discovery site for all AI models available on the [OpenGradient Hub](https://hub.opengradient.ai/models) — showing what each model is best for, its strengths, and how to use it.

**Live site:** `https://YOUR_USERNAME.github.io/og-model-hub/`

-----

## Features

- 23 real models across 7 providers (OpenAI, Anthropic, Google, xAI, Meta, Mistral, OpenGradient)
- Filter by category: Crypto, Writing, Coding, Vision, Speed, Agents, Analysis
- Filter by provider
- Search by task or use case
- Expandable cards with Best For list, stats, and direct OG Hub links
- All TEE-verified models on OpenGradient’s decentralized network

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:5173>

## Deploy to GitHub Pages

1. Push this repo to GitHub
1. Go to **Settings → Pages → Source** → select **GitHub Actions**
1. Push to `main` — it auto-deploys

> **Important:** Before deploying, update `vite.config.js` and change `og-model-hub` to your actual GitHub repo name:
> 
> ```js
> base: '/YOUR_REPO_NAME/',
> ```

## Build

```bash
npm run build
```

Output goes to `/dist`

-----

Built for the OpenGradient ecosystem.
