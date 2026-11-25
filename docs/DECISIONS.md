# Architecture decisions

## ADR-001: Preserve the managed web application at the repository root

**Status:** Accepted for Phase 1  
**Context:** The product specification requests `apps/web`, while Figma Make's
managed Next.js and Payload runtime requires the root `package.json`,
`src/app/(payload)`, `src/payload.config.ts`, and `.figma/make/*` lifecycle
scripts to remain in place. Moving these files would break preview, admin, and
deployment.

**Decision:** Treat the repository root as the deployable web workspace and keep
`apps/web` as the documented workspace boundary. Add `apps/api` and
`packages/shared` as pnpm workspaces. Do not duplicate the web runtime.

**Consequence:** Commands run from the root. This is a structural deviation only;
frontend routes and component boundaries still follow the requested architecture.

## ADR-002: Use managed Payload for application data and auth

**Status:** Superseded after Supabase provisioning failure  
**Context:** The specification fixes Supabase, while the current Figma Make
environment supplies a managed Payload backend and explicitly forbids adding
database adapters, connection strings, or migrations to that managed config.

**Decision:** The connected Supabase project provisioned Auth but not its Edge
Function or KV table, and no service-role key was available. With user approval,
RemoteBPO Hub now uses managed Payload for app users and marketplace records.
Public app users live in the separate `users` auth collection and never receive
Payload Admin access.

**Consequence:** The application uses one working managed data source, requires
no external secrets, and keeps app sessions isolated in the `app-session`
cookie. CMS admins remain in `admins`.

## ADR-003: Public Phase 1 routes are fixed static UI

**Status:** Accepted  
**Decision:** `/` and `/ui-kit` contain fixed product and design-system content
only. Operational and CMS-backed routes will choose their lifecycle in the phase
that introduces their real data.
