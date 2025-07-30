export async function GET() {
  try {
    const res = await fetch('https://demonslayer-api.com/api/v1/characters?limit=45');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    const error = e as Error;
    return new Response(
      JSON.stringify({ error: 'Failed to fetch characters.', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
