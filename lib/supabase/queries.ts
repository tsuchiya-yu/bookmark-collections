import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Bookmark,
  Collection,
  CollectionWithBookmarks,
} from "@/lib/supabase/types";

const collectionSelect =
  "id,title,description,slug,is_public,created_at,updated_at";

const bookmarkSelect =
  "id,collection_id,title,url,position,created_at,updated_at";

export const getPublicCollections = async (): Promise<Collection[]> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("collections")
    .select(collectionSelect)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load collections: ${error.message}`);
  }

  return data ?? [];
};

export const getPublicCollectionBySlug = async (
  slug: string
): Promise<CollectionWithBookmarks | null> => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("collections")
    .select(`${collectionSelect},bookmarks(${bookmarkSelect})`)
    .eq("slug", slug)
    .eq("is_public", true)
    .order("position", { foreignTable: "bookmarks", ascending: true })
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load collection: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    bookmarks: (data.bookmarks as Bookmark[]) ?? [],
  };
};
