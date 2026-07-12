import fs from "node:fs/promises";
import path from "node:path";

import type { NodePlopAPI, Actions } from "plop";
import { kebabCase } from "scule";

type PathResolution =
  | {
      type: "feature";
      prefix: string;
      target: string;
    }
  | {
      type: "pass";
      target: string;
    };

const resolveFeature =
  (prompt: string) =>
  (factory: (data: PathResolution) => string): string => {
    const regex = /(.*)@feature:(.*)/;
    const matches = prompt.match(regex);

    if (matches === null)
      return factory({
        type: "pass",
        target: prompt,
      });

    return factory({
      type: "feature",
      prefix: `src/features/${matches[2]}`,
      target: matches[1],
    });
  };

// oxlint-disable-next-line typescript/unbound-method
export default ({ setGenerator, setHelper }: NodePlopAPI) => {
  setHelper("slug", (text) =>
    typeof text !== "string" ? text : text === "/" ? text : text.split("/").at(-1),
  );

  setGenerator("component", {
    description: "Reusable UI. Generate the component, specification, and stories.",
    prompts: [
      {
        name: "name",
        message: "The component is named",
      },
    ],
    actions: (data) => {
      const actions: Actions = [];

      if (data === undefined) return actions;
      const name = resolveFeature(data.name);

      data.name = name(({ target }) => target);

      actions.push({
        type: "add",
        path: name((data) =>
          data.type === "feature"
            ? `${data.prefix}/components/${kebabCase(data.target)}.tsx`
            : `src/components/${kebabCase(data.target)}.tsx`,
        ),
        templateFile: "templates/component/component.tsx.hbs",
      });

      actions.push({
        type: "add",
        path: name((data) =>
          data.type === "feature"
            ? `${data.prefix}/components/${kebabCase(data.target)}.spec.tsx`
            : `src/components/${kebabCase(data.target)}.spec.tsx`,
        ),
        templateFile: "templates/component/component.spec.tsx.hbs",
      });

      actions.push({
        type: "add",
        path: name((data) =>
          data.type === "feature"
            ? `${data.prefix}/components/${kebabCase(data.target)}.stories.tsx`
            : `src/components/${kebabCase(data.target)}.stories.tsx`,
        ),
        templateFile: "templates/component/component.stories.tsx.hbs",
      });

      return actions;
    },
  });

  setGenerator("content-collection", {
    description: "Automated type safe content collection generation.",
    prompts: [
      {
        name: "name",
        message: "The collection is named",
      },
    ],
    actions: [
      {
        type: "add",
        path: "collections/{{ kebabCase name }}.collection.ts",
        templateFile: "templates/content-collection/collection.ts.hbs",
      },
      {
        type: "add",
        force: true,
        path: "content-collections.ts",
        transform: async () => {
          const collections = await fs.readdir(`${import.meta.dirname}/collections`, {
            withFileTypes: true,
          });
          const names = collections.map((file) => path.parse(file.name));

          return [
            'import { defineConfig } from "@content-collections/core";',
            "",
            ...names.map(
              (file) =>
                `import ${file.name.replace(/\.[^/.]+$/, "")} from "./collections/${file.base}";`,
            ),
            "",
            "export default defineConfig({",
            `\tcontent: [${names.map((file) => file.name.replace(/\.[^/.]+$/, "")).join(", ")}]`,
            "});",
            "",
          ].join("\n");
        },
      },
    ],
  });

  setGenerator("context", {
    description: "Shared data scoped to a component subtree.",
    prompts: [
      {
        name: "feature",
        message: "Context for what feature?",
      },
    ],
    actions: (data) => {
      const actions: Actions = [];

      if (data === undefined) return actions;
      const context = resolveFeature(data.name);

      data.name = context(({ target }) => target);

      actions.push({
        type: "add",
        path: context((data) =>
          data.type === "feature"
            ? `${data.prefix}/context/${kebabCase(data.target)}-context.tsx`
            : `src/context/${kebabCase(data.target)}-context.tsx`,
        ),
        templateFile: "templates/context/context.ts.hbs",
      });

      actions.push({
        type: "add",
        path: context((data) =>
          data.type === "feature"
            ? `${data.prefix}/context/${kebabCase(data.target)}-context.spec.tsx`
            : `src/context/${kebabCase(data.target)}-context.spec.tsx`,
        ),
        templateFile: "templates/context/context.spec.ts.hbs",
      });

      return actions;
    },
  });

  setGenerator("hook", {
    description: "Reusable reactive functions with tests.",
    prompts: [
      {
        name: "name",
        message: "The hook is for",
      },
    ],
    actions: (data) => {
      const actions: Actions = [];

      if (data === undefined) return actions;
      const hook = resolveFeature(data.name);

      data.name = hook(({ target }) => target);

      actions.push({
        type: "add",
        path: hook((data) =>
          data.type === "feature"
            ? `${data.prefix}/hooks/use-${kebabCase(data.target)}.ts`
            : `src/hooks/use-${kebabCase(data.target)}.ts`,
        ),
        templateFile: "templates/hooks/hook.ts.hbs",
      });

      actions.push({
        type: "add",
        path: hook((data) =>
          data.type === "feature"
            ? `${data.prefix}/hooks/use-${kebabCase(data.target)}.spec.ts`
            : `src/hooks/use-${kebabCase(data.target)}.spec.ts`,
        ),
        templateFile: "templates/hooks/hook.spec.ts.hbs",
      });

      return actions;
    },
  });

  setGenerator("query", {
    description: "Reusable type safe managed queries.",
    prompts: [
      {
        name: "query",
        message: "Query data for",
      },
    ],
    actions: (data) => {
      const actions: Actions = [];

      if (data === undefined) return actions;
      const query = resolveFeature(data.name);

      data.name = query(({ target }) => target);

      actions.push({
        type: "add",
        path: query((data) =>
          data.type === "feature"
            ? `${data.prefix}/queries/${kebabCase(data.target)}-query.ts`
            : `src/queries/${kebabCase(data.target)}-query.ts`,
        ),
        templateFile: "templates/query/query.ts.hbs",
      });

      actions.push({
        type: "add",
        path: query((data) =>
          data.type === "feature"
            ? `${data.prefix}/queries/${kebabCase(data.target)}-query.spec.ts`
            : `src/queries/${kebabCase(data.target)}-query.spec.ts`,
        ),
        templateFile: "templates/query/query.spec.ts.hbs",
      });

      return actions;
    },
  });

  setGenerator("store", {
    description: "Reusable global state.",
    prompts: [
      {
        name: "name",
        message: "The store is for",
      },
    ],
    actions: (data) => {
      const actions: Actions = [];

      if (data === undefined) return actions;
      const name = resolveFeature(data.name);

      data.name = name(({ target }) => target);

      actions.push({
        type: "add",
        path: name((data) =>
          data.type === "feature"
            ? `${data.prefix}/stores/${kebabCase(data.target)}-molecule.ts`
            : `src/stores/${kebabCase(data.target)}-molecule.ts`,
        ),
        templateFile: "templates/molecule/molecule.ts.hbs",
      });

      actions.push({
        type: "add",
        path: name((data) =>
          data.type === "feature"
            ? `${data.prefix}/stores/${kebabCase(data.target)}-molecule.spec.ts`
            : `src/stores/${kebabCase(data.target)}-molecule.spec.ts`,
        ),
        templateFile: "templates/molecule/molecule.spec.ts.hbs",
      });

      return actions;
    },
  });

  setGenerator("route", {
    description: "Router view. Includes tests and stories.",
    prompts: [
      {
        name: "route",
        message: "Generate route at",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/routes/{{ route }}.tsx",
        templateFile: "templates/route/route.tsx.hbs",
      },
      {
        type: "add",
        path: "src/routes/{{ route }}.spec.tsx",
        templateFile: "templates/route/route.spec.tsx.hbs",
      },
      {
        type: "add",
        path: "src/routes/{{ route }}.stories.tsx",
        templateFile: "templates/route/route.stories.tsx.hbs",
      },
    ],
  });

  setGenerator("route", {
    description: "Router view. Includes tests and stories.",
    prompts: [
      {
        name: "route",
        message: "Generate route at",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/routes/{{ route }}.tsx",
        templateFile: "templates/route/route.tsx.hbs",
      },
      {
        type: "add",
        path: "src/routes/{{ route }}.spec.tsx",
        templateFile: "templates/route/route.spec.tsx.hbs",
      },
      {
        type: "add",
        path: "src/routes/{{ route }}.stories.tsx",
        templateFile: "templates/route/route.stories.tsx.hbs",
      },
    ],
  });
};
