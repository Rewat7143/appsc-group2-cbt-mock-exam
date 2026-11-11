import { PaperMetadata, Question } from '@/types/exam';
import papersMetadata from '@/data/papers-metadata.json';

// In Next.js App router (client and server), papers can be imported or fetched
export function getAllPapers(): PaperMetadata[] {
  return papersMetadata as PaperMetadata[];
}

export function getPaperMetadata(paperId: string): PaperMetadata | undefined {
  const papers = getAllPapers();
  return papers.find((p) => p.id === paperId) || papers[0];
}

export async function getPaperQuestions(paperId: string): Promise<Question[]> {
  try {
    // Dynamic import of paper json
    if (paperId === 'paper-01') {
      const data = await import('@/data/papers/paper-01.json');
      return (data.default as unknown) as Question[];
    }
    // Fallback or generic support
    const fallback = await import('@/data/papers/paper-01.json');
    return (fallback.default as unknown) as Question[];
  } catch (err) {
    console.error(`Failed to load questions for ${paperId}`, err);
    return [];
  }
}
