-- MVP schema for public, read-only bookmarks.
-- Focus: anonymous read access; writes disabled by default with RLS.

-- UUID generation for primary keys.
create extension if not exists "pgcrypto";

-- Collections (bookmark summaries).
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  slug text not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bookmarks belonging to a collection.
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.collections(id) on delete cascade,
  title text not null,
  url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Slug should be unique and fast to look up.
alter table public.collections
  add constraint collections_slug_unique unique (slug);

create index if not exists collections_slug_idx
  on public.collections (slug);

-- Support ordering bookmarks by collection and position.
create index if not exists bookmarks_collection_position_idx
  on public.bookmarks (collection_id, position);

-- Auto-update updated_at on writes (future-ready).
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_collections_updated_at
before update on public.collections
for each row execute function public.set_updated_at();

create trigger set_bookmarks_updated_at
before update on public.bookmarks
for each row execute function public.set_updated_at();

-- RLS: read-only public access for public collections only.
alter table public.collections enable row level security;
alter table public.bookmarks enable row level security;

create policy collections_select_public
on public.collections
for select
using (is_public = true);

create policy bookmarks_select_public
on public.bookmarks
for select
using (
  exists (
    select 1
    from public.collections c
    where c.id = bookmarks.collection_id
      and c.is_public = true
  )
);

-- No insert/update/delete policies: writes are blocked by default.
