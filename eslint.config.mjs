// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { defineConfig } from "eslint/config";

import pluginQuery from '@tanstack/eslint-plugin-query'
import storybook from "eslint-plugin-storybook";
import oxlint from 'eslint-plugin-oxlint';

export default defineConfig(
  ...pluginQuery.configs['flat/recommended'],
  ...storybook.configs["flat/recommended"],
  ...oxlint.configs['flat/recommended'],
  {
    ignores: ["**/*.gen.ts"]
  }
)
