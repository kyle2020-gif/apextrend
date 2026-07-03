-- ApexTrend Phase 7C: user profiles, persistent settings, and activity logs.
-- Run this in the Supabase SQL editor for the ApexTrend project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  country text,
  timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  theme text not null default 'light' check (theme in ('light', 'dark')),
  notifications_enabled boolean not null default true,
  scanner_sensitivity text not null default 'balanced',
  enabled_markets text[] not null default '{}',
  risk_percent numeric(5, 2) not null default 3,
  daily_profit_target numeric(12, 2) not null default 25,
  daily_loss_limit numeric(12, 2) not null default 10,
  max_open_trades integer not null default 1,
  max_trades_per_day integer not null default 5,
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists user_settings_set_updated_at on public.user_settings;
create trigger user_settings_set_updated_at
before update on public.user_settings
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.activity_logs enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
on public.profiles for delete
to authenticated
using (auth.uid() = id);

drop policy if exists "user_settings_select_own" on public.user_settings;
create policy "user_settings_select_own"
on public.user_settings for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "user_settings_insert_own" on public.user_settings;
create policy "user_settings_insert_own"
on public.user_settings for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "user_settings_update_own" on public.user_settings;
create policy "user_settings_update_own"
on public.user_settings for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "user_settings_delete_own" on public.user_settings;
create policy "user_settings_delete_own"
on public.user_settings for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "activity_logs_select_own" on public.activity_logs;
create policy "activity_logs_select_own"
on public.activity_logs for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "activity_logs_insert_own" on public.activity_logs;
create policy "activity_logs_insert_own"
on public.activity_logs for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "activity_logs_update_own" on public.activity_logs;
create policy "activity_logs_update_own"
on public.activity_logs for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "activity_logs_delete_own" on public.activity_logs;
create policy "activity_logs_delete_own"
on public.activity_logs for delete
to authenticated
using (auth.uid() = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.user_settings to authenticated;
grant select, insert, update, delete on public.activity_logs to authenticated;
