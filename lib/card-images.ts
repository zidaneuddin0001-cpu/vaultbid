export async function fetchPokemonImage(name: string, setName: string): Promise<string | null> {
  try {
    const q = encodeURIComponent(`name:"${name}" set.name:"${setName}"`);
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${q}&pageSize=1`);
    const data = await res.json();
    return data?.data?.[0]?.images?.large ?? data?.data?.[0]?.images?.small ?? null;
  } catch {
    return null;
  }
}

export async function fetchMagicImage(name: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`);
    const data = await res.json();
    if (data.object === "error") return null;
    return data?.image_uris?.large ?? data?.image_uris?.normal ?? null;
  } catch {
    return null;
  }
}

export async function fetchOnePieceImage(name: string, setName: string): Promise<string | null> {
  try {
    // TCGDex covers One Piece TCG cards
    const res = await fetch(
      `https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(name)}&illustrator=*&hp=*`,
      { headers: { "Accept": "application/json" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const card = Array.isArray(data) ? data[0] : null;
    if (!card?.image) return null;
    return `${card.image}/high.webp`;
  } catch {
    return null;
  }
}

export async function fetchDragonBallImage(name: string): Promise<string | null> {
  try {
    // Try TCGDex for Dragon Ball Super Card Game
    const res = await fetch(
      `https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(name)}`,
      { headers: { "Accept": "application/json" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const card = Array.isArray(data) ? data[0] : null;
    if (!card?.image) return null;
    return `${card.image}/high.webp`;
  } catch {
    return null;
  }
}

export async function lookupCardImage(
  category: string,
  name: string,
  setName: string,
): Promise<string | null> {
  if (category === "Pokémon")     return fetchPokemonImage(name, setName);
  if (category === "Magic")       return fetchMagicImage(name);
  if (category === "One Piece")   return fetchOnePieceImage(name, setName);
  if (category === "Dragon Ball") return fetchDragonBallImage(name);
  return null;
}
