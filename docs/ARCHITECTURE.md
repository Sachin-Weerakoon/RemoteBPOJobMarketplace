# RemoteBPO Hub architecture

## Phase 1 boundaries

- **Web runtime:** Next.js App Router at the repository root.
- **Managed platform:** Payload Admin and APIs under `src/app/(payload)`.
- **Shared domain:** `packages/shared` contains Zod schemas, constants, and pure
  scoring/state-machine functions.
- **API boundary:** `apps/api` reserves the `/api/v1`, `/health`, and `/ready`
  contracts without starting a second server during Phase 1.
- **Design reference:** `design-reference` preserves the approved Vite export.

Public fixed routes are statically rendered. Interactive behavior is isolated in
small client components; layouts and display components remain server components.

## Completed application phases

1. **Foundation:** workspace boundaries, design tokens, shared contracts, and UI kit.
2. **Data:** managed Payload collections with collection-boundary access controls.
3. **Authentication:** Payload email/password accounts with candidate and employer roles.
4. **Marketplace:** live verified-company directory, job search, job details, saving, and applying.
5. **Candidate workspace:** profile, saved jobs, application tracking, and typing assessment.
6. **Employer workspace:** company profile, draft/published jobs, dashboard, and applicant pipeline.
7. **Trust operations:** protected employer verification and publication gating.
8. **Quality:** responsive navigation, accessible states, tests, type checking, and production verification.

CMS editors can provision trust-operations users by assigning the app-level
`admin` role in the Users collection. Public registration can create only
candidate or employer profiles.
