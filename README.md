<hgroup>
  <h1 align="center">
    React App Template
  </h1>

  <p align="center">
    <i>Single Page Application template</i>
  </p>
</hgroup>

<div align="center">

[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](#)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff)](#)
[![Playwright](https://custom-icon-badges.demolab.com/badge/Playwright-2EAD33?logo=playwright&logoColor=fff)](#)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=fff)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![React Query](https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff)](#)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](#)

</div>

[Bunshi]: https://www.bunshi.org/recipes/jotai/
[Fast Check]: https://fast-check.dev/
[Jotai]: https://jotai.org/
[oxc]: https://oxc.rs/
[Playwright]: https://playwright.dev/
[pnpm]: https://pnpm.io/
[Query]: https://tanstack.com/query/latest
[Router]: https://tanstack.com/router/latest
[Storybook]: https://storybook.js.org/
[TypeScript 7]: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
[Vite]: https://vite.dev/
[Vitest]: https://vitest.dev/

## Features

- 🚅 [pnpm] + [oxc] + [Vite] + [TypeScript 7] — faster than ever development experience
- 🛡️ [Stricter supply chain security settings](https://pnpm.io/supply-chain-security)
- 🎭 [Containerized](https://podman.io/) [Playwright] — run Playwright on unsupported distros
- 🧪 [Vitest] + [Playwright] + [Storybook] + [Fast Check] — comprehensive application testing 
- 🏝️ TanStack [Router] + [Query] — declarative application type safety
- 👻 [Jotai] + [Bunshi] — simple, flexible, and scalable state management
- 🎩 [Type safe tree shaken automatic imports — no bloat, no import keyword needed](https://github.com/unplugin/unplugin-auto-import)
- 🏗️ Automated code scaffolding — `pnpm generate`
- 📦 Bundle visualizer — see what's increasing your bundle size

## Template Task List

- [ ] Install [pnpm](https://pnpm.io/installation)
- [ ] Install [Podman](https://podman.io/docs/installation)
- [ ] Update `LICENSE` file for open source software **or** remove it.
- [ ] Change the icons `favicon.ico`, `pwa-192x192.png`, and `pwa-512x512.png` in `/public`
- [ ] Configure `pwa.config.ts`
- [ ] Configure `capacitor.config.ts`
- [ ] Delete or update this `README`

### For Full Stack

While this template was not designed with full stack development in mind, [TanStack Start offers a migration path from a Single Page Application to full-stack web application.](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch)

In addition, you'll likely want to consider a library for the following concerns.

- **Database**
  - [Drizzle ORM](https://orm.drizzle.team/)
  - [Prisma ORM](https://www.prisma.io/)
- **Auth**
  - [Better Auth](https://better-auth.com/docs/integrations/tanstack)
- **Logging**
  - [`evlog`](https://www.evlog.dev/integrate/frameworks/tanstack-start)
- **Storage**
  - [`unstorage`](https://unstorage.unjs.io/)
- **OpenAPI**[^1]
  - [Nitro](https://nitro.build/examples/vite-ssr-tss-react)
  - [`orpc`](https://orpc.dev)
  - [Hono OpenAPI](https://hono.dev/examples/hono-openapi)
- **Synchronization**
  - [TanStack DB](https://tanstack.com/db/latest)
  - [TinyBase](https://tinybase.org)

## License

BSD0 **or** Apache License 2.0

[^1]: OpenAPI can automatically generate documentation and client SDKs; this is particularly useful if your service provides API access or if you maintain separate native clients.
