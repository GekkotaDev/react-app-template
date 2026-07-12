import "vitest";

type RuntimeTags = "server" | "browser";
type TypeTags = "unit" | "story" | "integration" | "staging";
type MetaTags = "deprecated" | "errors" | "indev" | "regression" | "refactoring" | "flaky";

type Tags = RuntimeTags | TypeTags | MetaTags;

declare module "vitest" {
  interface TestTags {
    tags: Tags;
  }
}
