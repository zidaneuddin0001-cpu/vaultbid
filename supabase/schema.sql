-- ============================================================
-- VaultBid Schema
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  username   text unique not null,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auctions
create table if not exists public.auctions (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  set_name     text not null,
  year         int not null,
  grade        text not null,
  grader       text not null,
  cert_number  text,
  category     text not null,
  image_url    text,
  seller_id    uuid not null references public.profiles (id) on delete cascade,
  starting_bid numeric(12, 2) not null,
  current_bid  numeric(12, 2) not null,
  bid_count    int not null default 0,
  ends_at      timestamptz not null,
  status       text not null default 'active' check (status in ('active', 'ended', 'cancelled')),
  created_at   timestamptz not null default now()
);

-- Bids
create table if not exists public.bids (
  id         uuid primary key default gen_random_uuid(),
  auction_id uuid not null references public.auctions (id) on delete cascade,
  bidder_id  uuid not null references public.profiles (id) on delete cascade,
  amount     numeric(12, 2) not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.auctions enable row level security;
alter table public.bids enable row level security;

-- Profiles: anyone can read; users can update their own
create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- Auctions: anyone can read active auctions; authenticated users can insert
create policy "auctions_select" on public.auctions for select using (true);
create policy "auctions_insert" on public.auctions for insert with check (auth.uid() = seller_id);
create policy "auctions_update_seller" on public.auctions for update using (auth.uid() = seller_id);

-- Bids: anyone can read; authenticated users can insert their own bids
create policy "bids_select" on public.bids for select using (true);
create policy "bids_insert" on public.bids for insert with check (auth.uid() = bidder_id);

-- ============================================================
-- Function: place a bid atomically
-- Validates amount > current_bid, inserts bid, updates auction
-- ============================================================

create or replace function public.place_bid(
  p_auction_id uuid,
  p_amount     numeric
)
returns void language plpgsql security definer as $$
declare
  v_current_bid numeric;
  v_ends_at     timestamptz;
  v_status      text;
begin
  select current_bid, ends_at, status
  into v_current_bid, v_ends_at, v_status
  from public.auctions
  where id = p_auction_id
  for update;

  if not found then
    raise exception 'Auction not found';
  end if;

  if v_status <> 'active' then
    raise exception 'Auction is not active';
  end if;

  if v_ends_at < now() then
    raise exception 'Auction has ended';
  end if;

  if p_amount <= v_current_bid then
    raise exception 'Bid must exceed current bid of %', v_current_bid;
  end if;

  insert into public.bids (auction_id, bidder_id, amount)
  values (p_auction_id, auth.uid(), p_amount);

  update public.auctions
  set current_bid = p_amount,
      bid_count   = bid_count + 1
  where id = p_auction_id;
end;
$$;

-- ============================================================
-- Seed data (optional — delete if you want a clean slate)
-- ============================================================

-- To seed, first create a user via Supabase Auth, then replace
-- the UUID below with that user's ID from auth.users.

-- insert into public.auctions
--   (name, set_name, year, grade, grader, cert_number, category, image_url, seller_id, starting_bid, current_bid, ends_at)
-- values
--   ('Charizard', 'Base Set', 1999, 'PSA 10', 'PSA', '12345678', 'Pokémon', null,
--    '<your-user-uuid>', 100, 4200, now() + interval '2 days');
