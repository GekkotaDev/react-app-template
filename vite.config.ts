import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { purgePolyfills } from "unplugin-purge-polyfills";

import bundler from "./bundle-visualizer.config";
import imports from "./imports";
import pwa from "./pwa.config";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    imports,
    purgePolyfills.vite({}),
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    pwa,
    bundler,
  ],
});

export default config;
