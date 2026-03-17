"use client";

import { useQuery } from "@apollo/client/react";
import ArtistsSection from "./components/ArtistsSection";
import AlbumsSection from "./components/AlbumsSection";
import TracksSection from "./components/TracksSection";
import InteractiveQueries from "./components/InteractiveQueries";
import { GET_ALL_DATA } from "./lib/graphql-queries";
import { GetAllDataResponse } from "./lib/graphql-types";

export default function Home() {
  const { loading, error, data } = useQuery<GetAllDataResponse>(GET_ALL_DATA);

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 flex items-center justify-center">
        <div className="text-lg text-red-500">Error: {error.message}</div>
      </div>
    );

  const artists = data?.artists || [];
  const albums = data?.albums || [];
  const tracks = data?.tracks || [];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          Music Database
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ArtistsSection artists={artists} />
          <AlbumsSection albums={albums} artists={artists} />
          <TracksSection tracks={tracks} albums={albums} />
        </div>

        <InteractiveQueries artists={artists} albums={albums} />
      </div>
    </div>
  );
}
