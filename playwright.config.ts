import { defineConfig, devices } from '@playwright/test'

/**
 * Smoke coverage for the behaviours most likely to regress during revisions:
 * navigation, responsive integrity, form validation, motion preferences and the
 * hero fallback. Tests run against the production build, not `next dev`.
 */
/** Overridable so a run can dodge a port already taken on the machine. */
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3210)
const baseURL = `http://127.0.0.1:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /*
   * On CI, `github` annotates the failing lines directly in the diff view, and
   * `html` is what the workflow uploads as an artifact — without it a failed
   * run leaves nothing to inspect but scrollback. `open: 'never'` stops the
   * reporter trying to launch a browser on a headless runner.
   */
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop-1440',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'laptop-1280',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'tablet-768',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
    /*
     * A real device descriptor, not a resized `Desktop Chrome` — the previous
     * `mobile-390` project set only the viewport, so every "mobile" assertion
     * (touch targets included) actually ran hover-capable, mouse-driven, at 1×
     * device pixel ratio. `Pixel 7` supplies `hasTouch: true`, `isMobile: true`
     * and a real `deviceScaleFactor` (412×839 @2.625×), and stays on the
     * Chromium binary `pnpm test:install` already fetches.
     */
    {
      name: 'mobile-pixel7',
      use: { ...devices['Pixel 7'] },
    },
    /*
     * WebKit — the engine behind Safari and every iPhone browser regardless of
     * its name, since iOS requires all browsers to embed it. Nothing here was
     * previously verified outside Chromium; see docs/QA_REPORT.md's own
     * "Verified in Chromium only" admission.
     */
    {
      name: 'webkit-iphone',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'webkit-desktop-1440',
      use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } },
    },
    /*
     * The third engine. Gecko is a small share of this site's traffic, but it
     * is the only one of the three that is neither Blink nor WebKit, so it is
     * where a genuinely non-standard assumption shows up — and it costs one
     * project to find out rather than a bug report.
     */
    {
      name: 'firefox-desktop-1440',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: `pnpm start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
