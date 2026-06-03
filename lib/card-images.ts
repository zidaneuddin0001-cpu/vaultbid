export async function fetchPokemonImage(name: string, setName: string): Promise<string | null> {
  try {
    const q = encodeURIComponent(`name:"${name}" set.name:"${setName}"`);
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${q}&pageSize=1`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data?.data?.[0]?.images?.large ?? data?.data?.[0]?.images?.small ?? null;
  } catch {
    return null;
  }
}

export async function fetchMagicImage(name: string, setName: string): Promise<string | null> {
  try {
    // Try with set code first, then fall back to just name
    const res = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`,
    );
    const data = await res.json();
    if (data.object === "error") return null;
    return data?.image_uris?.large ?? data?.image_uris?.normal ?? null;
  } catch {
    return null;
  }
}

export async function fetchOnePieceImage(name: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://optcgdb.com/api/cards?name=${encodeURIComponent(name)}&limit=1`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.image ?? null;
  } catch {
    return null;
  }
}

export async function lookupCardImage(
  category: string,
  name: string,
  setName: string,
): Promise<string | null> {
  if (category === "Pokémon") return fetchPokemonImage(name, setName);
  if (category === "Magic") return fetchMagicImage(name, setName);
  if (category === "One Piece") return fetchOnePieceImage(name);
  return null;
}
