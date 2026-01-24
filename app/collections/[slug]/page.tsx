import { notFound } from "next/navigation";

import { getPublicCollectionBySlug } from "@/lib/supabase/queries";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getPublicCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <main>
      <h1>{collection.title}</h1>
      {collection.description ? <p>{collection.description}</p> : null}
      {collection.bookmarks.length === 0 ? (
        <p>No bookmarks.</p>
      ) : (
        <ul>
          {collection.bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={bookmark.url} target="_blank" rel="noreferrer">
                {bookmark.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
