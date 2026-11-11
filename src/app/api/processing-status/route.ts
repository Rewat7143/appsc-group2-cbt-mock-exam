import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const statusPath = path.join(process.cwd(), 'public', 'processing-status.json');
    if (!fs.existsSync(statusPath)) {
      return NextResponse.json({
        active: false,
        stage: 'idle',
        stageLabel: 'No extraction in progress',
        percent: 0,
        completed: false,
        paperId: null,
      });
    }

    const content = fs.readFileSync(statusPath, 'utf8');
    const data = JSON.parse(content);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to read processing status', details: message },
      { status: 500 }
    );
  }
}
