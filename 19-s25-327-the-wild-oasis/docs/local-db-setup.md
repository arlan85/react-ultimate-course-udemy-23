# Local Database Setup

Uses Supabase CLI to run a full local Supabase stack (Postgres, PostgREST, Auth, Storage, Studio).

## Prerequisites

- Docker Desktop running
- Supabase CLI: `brew install supabase/tap/supabase`

## First-time setup

```bash
supabase start
```

> If another Supabase project is running, ports may conflict. This project is configured to use offset ports (5434x) to avoid clashes with the default 5432x range.

## Local service URLs

| Service  | URL                          |
|----------|------------------------------|
| Studio   | http://127.0.0.1:54343       |
| Mailpit  | http://127.0.0.1:54344       |
| API      | http://127.0.0.1:54341       |
| REST     | http://127.0.0.1:54341/rest/v1 |
| Storage  | http://127.0.0.1:54341/storage/v1/s3 |

## Database connection

```
postgresql://postgres:postgres@127.0.0.1:54332/postgres
```

## Storage (S3-compatible)

| Field      | Value                                                              |
|------------|--------------------------------------------------------------------|
| URL        | http://127.0.0.1:54341/storage/v1/s3                              |
| Access Key | 625729a08b95bf1b7ff351a663f3a23c                                   |
| Secret Key | 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907  |
| Region     | local                                                              |

## Required .env variables

```env
DB_HOST=127.0.0.1
DB_PORT=54332
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_URL=postgresql://postgres:postgres@127.0.0.1:54332/postgres

VITE_SUPABASE_URL=http://127.0.0.1:54341
VITE_SUPABASE_ANON_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH
```

## Stopping

```bash
supabase stop
```

## Port conflicts

If another Supabase project is already running, stop it first:

```bash
supabase stop --project-id <other-project-id>
```

Or check `supabase/config.toml` to adjust ports under `[api]`, `[db]`, `[studio]`, and `[inbucket]`.
