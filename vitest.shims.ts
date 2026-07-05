import "vitest";

declare module "vitest" {
  interface TestTags {
    tags: "deprecated" | "errors" | "indev" | "regression" | "refactoring" | "flaky";
  }
}
