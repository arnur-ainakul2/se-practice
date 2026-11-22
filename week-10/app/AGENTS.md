# AGENTS.md — Smart Campus Room Availability Checker

Instructions for any coding agent working in this project. Read this file before you change
anything, and follow it over any general habit of yours.

## Project

A React + TypeScript page (Vite) that tells a student whether a campus room is free for a
requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
the tests are in `src/booking.test.ts`.

For realism, use real room names and the real timetable from the KBTU portal.

Never commit secrets or real personal information.

## Acceptance contract

- AC1 Reject start ≥ end and requests in the past.
- AC2 Enforce the maximum allowed duration (120 minutes).
- AC3 Reject a blocked room.
- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
- AC5 Return Available / Unavailable without changing booking data.
- AC6 Preserve clear UI feedback on desktop and mobile.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Tests: `npm run test:unit`
- Build: `npm run build`

## You may

- Edit any file in the project.
- Add packages when a task needs them.
- If bookings need to persist, add a small Supabase table and a login page.

## Before you finish

- Make sure the page still loads.
- Run the tests and review their actual output before proposing acceptance.
- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
