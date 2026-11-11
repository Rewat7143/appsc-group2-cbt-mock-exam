import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }

    const pyqsDir = path.join(process.cwd(), 'pyqs');
    if (!fs.existsSync(pyqsDir)) {
      fs.mkdirSync(pyqsDir, { recursive: true });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9_\-\. \(\)]/g, '_');
    const filePath = path.join(pyqsDir, safeName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    // Initialize progress status
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const statusPath = path.join(publicDir, 'processing-status.json');
    const initialStatus = {
      active: true,
      paperId: null,
      paperTitle: safeName.replace(/\.pdf$/i, ''),
      filename: safeName,
      stage: 'uploaded',
      stageLabel: `Uploaded ${safeName}. Initializing extraction engine...`,
      currentPage: 0,
      totalPages: 0,
      questionsFound: 0,
      totalExpected: 150,
      percent: 5,
      completed: false,
      error: null,
      redirectUrl: null,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(statusPath, JSON.stringify(initialStatus, null, 2));

    // Spawn python auto-process in background
    const scriptPath = path.join(process.cwd(), 'scripts', 'auto_process_pyqs.py');
    const pythonProc = spawn('python3', [scriptPath], {
      detached: true,
      stdio: 'ignore',
      cwd: process.cwd(),
    });
    pythonProc.unref();

    return NextResponse.json({
      success: true,
      message: 'PDF uploaded successfully. Extraction started.',
      filename: safeName,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Upload failed', details: message }, { status: 500 });
  }
}
