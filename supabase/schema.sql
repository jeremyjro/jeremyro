-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query).

create table if not exists public.essays (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  author text default 'Jeremy Ro',
  content_html text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists essays_set_updated_at on public.essays;
create trigger essays_set_updated_at
  before update on public.essays
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.essays enable row level security;

-- Anyone can read PUBLISHED essays
drop policy if exists "public read published" on public.essays;
create policy "public read published"
  on public.essays for select
  using (published = true);

-- Logged-in admin can read everything (incl. drafts)
drop policy if exists "authenticated read all" on public.essays;
create policy "authenticated read all"
  on public.essays for select
  to authenticated
  using (true);

-- Logged-in admin can create / edit / publish / delete
drop policy if exists "authenticated write" on public.essays;
create policy "authenticated write"
  on public.essays for all
  to authenticated
  using (true)
  with check (true);
