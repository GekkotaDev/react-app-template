import contentCollections from "@content-collections/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { purgePolyfills } from "unplugin-purge-polyfills";
import { defineConfig } from "vite";

import bundler from "./bundle-visualizer.config";
import imports from "./imports";
import pwa from "./pwa.config";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    contentCollections(),
    imports,
    purgePolyfills.vite({}),
    devtools(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routeFileIgnorePattern: ".(test|spec|stories).tsx",
    }),
    react(),
    babel({
      presets: [reactCompilerPreset(), "jotai-babel/preset"],
    }),
    pwa,
    ...bundler,
  ],
});

export default config;
