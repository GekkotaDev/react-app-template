import { execa } from "execa";
import type { TestProject } from "vitest/node";

const projects = new Set(["browser"]);

export default async (project: TestProject) => {
  if (!projects.has(project.name)) return;
  await execa`podman compose run playwright`;
};
