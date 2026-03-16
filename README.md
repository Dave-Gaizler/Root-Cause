# AOS Root Cause — Investigation Tickets

Modern internal tool for AOS root cause identification, taxonomy reference, and component dictionary.

Built with Next.js 15, Tailwind CSS, and shadcn/ui patterns.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000/AOS-Root-Cause](http://localhost:3000/AOS-Root-Cause)

## Deploy to GitHub Pages

```bash
npm run build
```

This outputs a static site to the `out/` directory. Push the `out/` contents to your GitHub Pages branch, or configure GitHub Actions to build and deploy automatically.

### GitHub Actions (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with tab navigation
├── components/
│   ├── ui/
│   │   └── accordion.tsx    # shadcn accordion
│   ├── callout.tsx          # Reusable callout/note component
│   ├── decision-tree.tsx    # Decision Tree tab
│   ├── quick-reference.tsx  # Quick Reference tab
│   └── component-taxonomy.tsx # Component Taxonomy tab
├── data/
│   ├── root-causes.ts       # Root cause definitions
│   ├── decision-tree.ts     # Decision tree steps/options
│   └── components.ts        # Component taxonomy data
├── lib/
│   └── utils.ts             # cn() utility
```

## Editing Content

All content is centralized in the `data/` directory:

- **Root causes**: Edit `data/root-causes.ts`
- **Decision tree flow**: Edit `data/decision-tree.ts`
- **Components**: Edit `data/components.ts`

Each file exports typed arrays, so TypeScript will catch any structural issues.
