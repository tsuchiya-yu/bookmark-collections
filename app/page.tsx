import Link from "next/link";

import { getPublicCollections } from "@/lib/supabase/queries";

export default async function Home() {
  const collections = await getPublicCollections();

  return (
    <main>
      <h1>Collections</h1>
      {collections.length === 0 ? (
        <p>No public collections.</p>
      ) : (
        <ul>
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link href={`/collections/${collection.slug}`}>
                {collection.title} ({collection.slug})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
