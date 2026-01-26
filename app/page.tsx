import Link from "next/link";
import type { Metadata } from "next";

import { getPublicCollections } from "@/lib/supabase/queries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ブックマークまとめ",
    description:
      "テーマ別に整理した、おすすめブックマークをまとめたサイトです。調べものや日々の生活に役立つリンクを厳選して掲載しています。",
  };
}

export default async function Home() {
  const collections = await getPublicCollections();

  return (
    <main className="min-h-dvh bg-white text-zinc-900">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        {/* 導入：情報は少なく、でも“段差”は作る */}
        <header className="space-y-4">
          <h1 className="text-balance text-3xl font-medium leading-tight">
            ブックマークまとめ
          </h1>

          <p className="text-pretty text-base leading-7 text-zinc-600">
            テーマ別に整理した、おすすめブックマーク
          </p>

          <p className="text-pretty text-sm leading-7 text-zinc-500">
            気になるまとめを開いて、まとまった知識にすぐアクセスできます。
          </p>
        </header>

        {/* 本文：目次（TOC）として“塊”を作る */}
        <section className="mt-16">
          {collections.length === 0 ? (
            <div className="space-y-3">
              <p className="text-pretty text-base text-zinc-600">
                まだ公開中のまとめはありません。
              </p>
              <a
                className="text-sm text-zinc-900 underline underline-offset-4 hover:text-zinc-800"
                href="http://127.0.0.1:54323"
                target="_blank"
                rel="noreferrer"
              >
                Supabase Studio でコレクションを追加
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {/* “本文に入った”合図。見出しは小さく控えめ */}
              <p className="text-xs font-medium tracking-wide text-zinc-500">
                公開中のまとめ
              </p>

              {/* 罫線なし：余白と“クリック塊”で目次感 */}
              <ul className="space-y-10">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    {/* 全体リンクだが、視覚的に「ここがリンク」と分かる塊にする */}
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="group block"
                      aria-label={`${collection.title} を開く`}
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <h2 className="text-balance text-xl font-medium leading-7 underline underline-offset-4 decoration-transparent transition-colors group-hover:decoration-zinc-300">
                          {collection.title}
                        </h2>
                        <span className="text-sm text-zinc-400 transition-colors group-hover:text-zinc-600">
                          →
                        </span>
                      </div>

                      {collection.description ? (
                        <p className="mt-2 text-pretty text-sm leading-6 text-zinc-600">
                          {collection.description}
                        </p>
                      ) : null}

                      <div className="mt-4 h-px w-full bg-transparent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
