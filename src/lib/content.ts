import { getCollection, type CollectionEntry } from 'astro:content';
import { BLOG_ENV, isVisible, pairPosts, type Lang } from './posts';

export async function getVisiblePosts(): Promise<CollectionEntry<'posts'>[]> {
  const all = await getCollection('posts', (p) => isVisible(p.data.draft, BLOG_ENV));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPairs(): Promise<Map<string, Record<Lang, CollectionEntry<'posts'>>>> {
  return pairPosts(await getVisiblePosts());
}
