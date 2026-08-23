# GharJagga Nepal

A production-oriented Nepal real-estate marketplace built with Next.js App Router, TypeScript, shadcn/ui, Tailwind CSS and Motion.

## Local setup

Copy `.env.example` to `.env.local`, set your public website URL and the Gmail inbox that should receive listing requests, then run:

```bash
pnpm dev
```

Property records live in `src/data/properties.json`. House images belong in `public/house/`; land images belong in `public/land/`. All land areas retain their local display unit and a normalized `sqFt` value for scalable filtering.

## Email flow

The current backend-free form validates in the browser and opens a pre-filled Gmail compose window addressed to `NEXT_PUBLIC_SALES_EMAIL`. When a backend is added, replace only the `onSubmit` transport inside `src/components/sell/sell-property-form.tsx`; the form schema and UI can remain unchanged.
