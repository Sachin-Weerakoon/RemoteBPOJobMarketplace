# Design differences

## Phase 1

- The production UI is decomposed into reusable Next.js components rather than
  the single stateful Vite `App.tsx`.
- The UI kit is a real `/ui-kit` route instead of a prototype-view switcher.
- Product data cards are represented only as component examples in the UI kit;
  real job, company, application, and KPI data will be connected in their
  dedicated phases.
- The visual tokens, typography, Arowana texture, shape language, focus styling,
  and responsive layout remain aligned with the recovered design reference.
