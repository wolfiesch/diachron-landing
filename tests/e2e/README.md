# E2E Tests (Playwright)

## Quick start

```bash
npm run test:e2e
```

## Helpful commands

```bash
npm run test:e2e:ui
npm run test:e2e:headed
npm run test:e2e:debug
npm run test:e2e:report
```

## How it works

- Tests live in `tests/e2e/`.
- The default run builds the app and serves it via `vite preview`.
- The Playwright config sets `VITE_E2E=true` for the preview server to reduce motion and make tests deterministic.

## Environment variables

- `PLAYWRIGHT_BASE_URL` (optional): Run tests against an existing server. If set, Playwright will not start the local preview server.

Example:

```bash
PLAYWRIGHT_BASE_URL=https://preview.diachron.ai npm run test:e2e
```

## External dependencies

- The waitlist tests mock Formspree requests via `page.route()` so tests do not hit the network.

## Reports and artifacts

- HTML report: `playwright-report/`
- Traces/videos/screenshots for failures: `test-results/`

Open the last report with:

```bash
npx playwright show-report
```

## Visual snapshots

Run snapshot tests and update baselines with:

```bash
npx playwright test tests/e2e/visual.spec.ts --update-snapshots
```

## Visual capture (always-on screenshots)

These tests capture full-page screenshots for multiple viewports and attach them to the HTML report
and artifacts on every run.

Run only the capture suite with:

```bash
npx playwright test tests/e2e/visual-capture.spec.ts
```
