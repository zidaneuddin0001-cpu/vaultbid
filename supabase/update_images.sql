-- Update image URLs for seeded auction cards
update public.auctions set image_url = 'https://images.pokemontcg.io/base4/4_hires.png'
where name = 'Charizard' and image_url is null;

update public.auctions set image_url = 'https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838'
where name = 'Black Lotus' and image_url is null;

update public.auctions set image_url = 'https://images.pokemontcg.io/ecard1/19_hires.png'
where name = 'Mew' and image_url is null;
