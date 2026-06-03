-- ============================================================
-- VaultBid Seed Data
-- Run in Supabase SQL Editor after schema.sql
-- Uses the first user in your profiles table as the seller
-- ============================================================

do $$
declare
  v_seller_id uuid;
begin
  select id into v_seller_id from public.profiles limit 1;

  if v_seller_id is null then
    raise exception 'No user found. Sign up via the app first, then run this seed.';
  end if;

  insert into public.auctions
    (name, set_name, year, grade, grader, cert_number, category, image_url, seller_id, starting_bid, current_bid, bid_count, ends_at)
  values
    ('Charizard',           'Base Set',      1999, 'PSA 10', 'PSA', '12345678', 'Pokémon',   null, v_seller_id, 100,   4200,  18, now() + interval '2 days'),
    ('Black Lotus',         'Alpha',         1993, 'BGS 9.5','BGS', '87654321', 'Magic',     null, v_seller_id, 500,   31000, 7,  now() + interval '6 days 12 hours'),
    ('Monkey D. Luffy',     'Romance Dawn',  2022, 'PSA 10', 'PSA', '11223344', 'One Piece', null, v_seller_id, 100,   890,   24, now() + interval '1 day 8 hours'),
    ('Mike Trout Rookie',   'Bowman Chrome', 2011, 'BGS 9.5','BGS', '44332211', 'Sports',    null, v_seller_id, 200,   1750,  11, now() + interval '3 days 22 hours'),
    ('Pikachu Illustrator', 'Promo',         1998, 'CGC 9',  'CGC', '99887766', 'Pokémon',   null, v_seller_id, 1000,  58000, 4,  now() + interval '9 days 1 hour'),
    ('LeBron James Rookie', 'Topps Chrome',  2003, 'PSA 9',  'PSA', '55667788', 'Sports',    null, v_seller_id, 200,   2100,  15, now() + interval '4 days 6 hours'),
    ('Mew',                 'Base Set',      1999, 'PSA 9',  'PSA', '13572468', 'Pokémon',   null, v_seller_id, 50,    340,   9,  now() + interval '5 days 3 hours'),
    ('Nami',                'Paramount War', 2023, 'PSA 10', 'PSA', '24681357', 'One Piece', null, v_seller_id, 50,    620,   31, now() + interval '14 hours 20 minutes');

end $$;
