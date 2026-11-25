# Web workspace boundary

The production Next.js application remains at the repository root because the
Figma Make lifecycle and managed Payload routes require the documented root
paths. This directory marks the requested monorepo boundary without duplicating
or proxying the application. See `docs/DECISIONS.md`.
