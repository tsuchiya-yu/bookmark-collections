export type Collection = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type Bookmark = {
  id: string;
  collection_id: string;
  title: string;
  url: string;
  position: number;
  created_at: string;
  updated_at: string;
};

export type CollectionWithBookmarks = Collection & {
  bookmarks: Bookmark[];
};

export type Database = {
  public: {
    Tables: {
      collections: {
        Row: Collection;
        Insert: Omit<Collection, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Collection>;
      };
      bookmarks: {
        Row: Bookmark;
        Insert: Omit<Bookmark, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Bookmark>;
      };
    };
  };
};
