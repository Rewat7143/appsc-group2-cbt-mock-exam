import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), 'src', 'data', 'papers-metadata.json');
    if (!fs.existsSync(metadataPath)) {
      return NextResponse.json([]);
    }

    const content = fs.readFileSync(metadataPath, 'utf8');
    const papers = JSON.parse(content);

    return NextResponse.json(papers, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to read papers metadata', details: message },
      { status: 500 }
    );
  }
}
