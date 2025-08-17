import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pokemons } = await request.json();

    if (!Array.isArray(pokemons) || pokemons.length === 0) {
      return NextResponse.json(
        { error: 'No pokemons provided' },
        { status: 400 }
      );
    }

    const csvContent = pokemons
      .map(
        (p: { name: string }, index: number) => `${index + 1}. Name: ${p.name}`
      )
      .join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv;charset=utf-8;',
        'Content-Disposition': `attachment; filename="${pokemons.length}_items.csv"`,
      },
    });
  } catch (error) {
    console.error('Error generating CSV:', error);
    return NextResponse.json(
      { error: 'Error generating CSV' },
      { status: 500 }
    );
  }
}
