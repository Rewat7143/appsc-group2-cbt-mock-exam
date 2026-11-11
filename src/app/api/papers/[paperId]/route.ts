import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { paperId: string } }
) {
  try {
    const paperId = params.paperId;
    const safeId = paperId.replace(/[^a-zA-Z0-9_\-]/g, '');
    const paperFile = path.join(process.cwd(), 'src', 'data', 'papers', `${safeId}.json`);

    if (!fs.existsSync(paperFile)) {
      return NextResponse.json({ error: `Paper ${paperId} not found` }, { status: 404 });
    }

    const content = fs.readFileSync(paperFile, 'utf8');
    const questions = JSON.parse(content);

    return NextResponse.json(questions, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to read paper questions', details: message }, { status: 500 });
  }
}
