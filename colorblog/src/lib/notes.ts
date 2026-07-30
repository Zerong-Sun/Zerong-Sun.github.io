import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategoryKey } from './locale';

export type Note = CollectionEntry<'notes'>;

export async function getAllNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getNoteBySlug(slug: string): Promise<Note | undefined> {
  const notes = await getAllNotes();
  return notes.find((n) => n.slug === slug);
}

export async function getRelatedNotes(note: Note, limit = 3): Promise<Note[]> {
  const all = await getAllNotes();
  const tags = new Set(note.data.tags);
  const category = note.data.category;

  return all
    .filter((n) => n.slug !== note.slug)
    .map((n) => {
      let score = n.data.tags.filter((t) => tags.has(t)).length;
      if (category && n.data.category === category) score += 2;
      return { note: n, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.note.data.date.valueOf() - a.note.data.date.valueOf())
    .slice(0, limit)
    .map((x) => x.note);
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
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getNotesByTag(tag: string): Promise<Note[]> {
  const notes = await getAllNotes();
  return notes.filter((n) => n.data.tags.includes(tag));
}

export async function getNotesByCategory(category: CategoryKey): Promise<Note[]> {
  const notes = await getAllNotes();
  return notes.filter((n) => n.data.category === category);
}

export async function getNotesGroupedByYear(): Promise<Map<number, Note[]>> {
  const notes = await getAllNotes();
  const map = new Map<number, Note[]>();
  for (const note of notes) {
    const year = note.data.date.getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(note);
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
}

export async function getAdjacentNotes(
  note: Note,
): Promise<{ prev: Note | null; next: Note | null }> {
  const all = await getAllNotes();
  const i = all.findIndex((n) => n.slug === note.slug);
  return {
    prev: i < all.length - 1 ? all[i + 1] : null,
    next: i > 0 ? all[i - 1] : null,
  };
}

export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const chars = body.replace(/\s/g, '').length;
  return Math.max(1, Math.ceil(chars / 400));
}

export function formatDate(date: Date, locale: 'zh' | 'en' = 'zh'): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  if (locale === 'en') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${d}, ${y}`;
  }
  return `${y}.${m}.${d}`;
}
