import { PaperMetadata, Question } from '@/types/exam';
import papersMetadata from '@/data/papers-metadata.json';

// Return metadata of all registered papers
export function getAllPapers(): PaperMetadata[] {
  return papersMetadata as PaperMetadata[];
}

export function getPaperMetadata(paperId: string): PaperMetadata | undefined {
  const papers = getAllPapers();
  return papers.find((p) => p.id === paperId) || papers[0];
}

export async function getPaperQuestions(paperId: string): Promise<Question[]> {
  try {
    // 1. Direct static imports for known papers (instant offline & client-side performance)
    if (paperId === 'paper-01') {
      const data = await import('@/data/papers/paper-01.json');
      return (data.default as unknown) as Question[];
    }
    if (paperId === 'paper-02') {
      try {
        const data = await import('@/data/papers/paper-02.json');
        return (data.default as unknown) as Question[];
      } catch {
        // If not bundled yet, proceed to API fetch below
      }
    }
    if (paperId === 'paper-03') {
      try {
        const data = await import('@/data/papers/paper-03.json');
        return (data.default as unknown) as Question[];
      } catch {
        // If not bundled yet, proceed to API fetch below
      }
    }

    // 2. Dynamic fetch via API for newly uploaded/extracted papers in client runtime
    if (typeof window !== 'undefined') {
      try {
        const res = await fetch(`/api/papers/${paperId}`, { cache: 'no-store' });
        if (res.ok) {
          const fetched = await res.json();
          if (Array.isArray(fetched) && fetched.length > 0) {
            return fetched as Question[];
          }
        }
      } catch (e) {
        console.warn(`Dynamic API fetch failed for ${paperId}`, e);
      }
    }

    // 3. Fallback to paper-01
    const fallback = await import('@/data/papers/paper-01.json');
    return (fallback.default as unknown) as Question[];
  } catch (err) {
    console.error(`Failed to load questions for ${paperId}`, err);
    return [];
  }
}
