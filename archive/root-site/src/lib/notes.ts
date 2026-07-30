import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

export async function getAllNotes(): Promise<Note[]> {
  const notes = await getCollection('notes');
  return notes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getNoteBySlug(slug: string): Promise<Note | undefined> {
  const notes = await getAllNotes();
  return notes.find((n) => n.slug === slug);
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const notes = await getAllNotes();
  const map = new Map<string, number>();
  for (const note of notes) {
    for (const tag of note.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag, 'zh-CN'));
}

export function excerpt(body: string | undefined, max = 200): string {
  if (!body) return '';
  const text = body.replace(/[#>*`\[\]()!-]/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-CA');
}

export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const text = body.replace(/[#>*`\[\]()!_-]/g, ' ').trim();
  const cjkChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) ?? []).length;
  const latinWords = text
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(cjkChars / 400 + latinWords / 200));
}

export function getAdjacentNotes(notes: Note[], slug: string) {
  const index = notes.findIndex((n) => n.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index < notes.length - 1 ? notes[index + 1] : undefined,
    next: index > 0 ? notes[index - 1] : undefined,
  };
}
