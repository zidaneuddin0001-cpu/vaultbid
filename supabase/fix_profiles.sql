-- Add missing columns to profiles
alter table public.profiles
  add column if not exists first_name  text,
  add column if not exists last_name   text,
  add column if not exists account_type text default 'buyer';

-- Allow authenticated users to insert their own profile row
create policy "profiles_insert"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Drop the auto-create trigger — signup page handles profile creation directly
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
