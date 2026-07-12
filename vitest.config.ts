import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

import viteConfig from "./vite.config";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const folders = ["context", "components", "hooks", "mutations", "queries", "stores", "utils"];
export default defineConfig({
  plugins: viteConfig.plugins,
  test: {
    globalSetup: ["vitest-setup.browser.ts"],
    reporters: ["default", "github-actions", "html", "json"],
    strictTags: true,
    tags: [
      // Environment tags.
      {
        name: "server",
        description: "Node.js / Deno testing environment",
      },
      {
        name: "browser",
        description: "Browser testing environment",
      },

      // Type tags.
      {
        name: "unit",
        description: "Unit tests.",
      },
      {
        name: "story",
        description: "Stories.",
      },
      {
        name: "integration",
        description: "Integration tests.",
      },
      {
        name: "staging",
        description: "Tests resembling production environment; requires test containers.",
      },

      // Meta tags.
      {
        name: "deprecated",
        description: "Deprecated features, will be removed.",
        skip: true,
      },
      {
        name: "errors",
        description: "Tests for aspects which SHOULD fail.",
        fails: true,
      },
      {
        name: "indev",
        description: "Tests for new and in development features.",
      },
      {
        name: "regression",
        description: "Tests for if a feature broke from updates.",
      },
      {
        name: "refactoring",
        description: "Tests for features being refactored",
      },
      {
        name: "flaky",
        description: "Tests with side effects.",
        retry: process.env.CI ? 3 : 0,
        timeout: 30_000,
        priority: 1,
      },
    ],
    benchmark: {},
    typecheck: {
      enabled: true,
    },

    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: [
            `src/**/{${folders.join(",")}/*.{test,spec}.{ts,js}`,
            `src/features/**/{${folders.join(",")}/*.{test,spec}.{ts,js}`,
          ],
          includeSource: [
            `src/**/{${folders.join(",")}/*.{ts,js}`,
            `src/features/**/{${folders.join(",")}/*.{ts,js}`,
          ],
          exclude: [`src/routes/**/*.{ts,js}`],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "browser",
          include: [
            `src/**/*.stories.{ts,js}`,
            `src/tests/**/*.e2e.{test,spec,stories}.{ts,js}`,
            `src/routes/**/*.e2e.{test,spec,stories}.{ts,js}`,
          ],
          includeSource: [`src/routes/**/*.{ts,js}`],

          browser: {
            api: 7357,
            enabled: true,
            provider: playwright(),
            // https://vitest.dev/config/browser/playwright
            instances: [
              {
                browser: "chromium",
              },
              {
                browser: "webkit",
              },
            ],
          },
        },
      },
    ],
  },
});
