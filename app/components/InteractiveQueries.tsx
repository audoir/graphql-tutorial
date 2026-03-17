"use client";

import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";
import { GET_ARTIST_BY_ID, GET_ALBUM_BY_ID } from "../lib/graphql-queries";
import { GetArtistByIdResponse, GetAlbumByIdResponse, ArtistWithAlbums, AlbumWithArtist } from "../lib/graphql-types";

interface InteractiveQueriesProps {
  artists: ArtistWithAlbums[];
  albums: AlbumWithArtist[];
}

export default function InteractiveQueries({ artists, albums }: InteractiveQueriesProps) {
  const [
    getArtist,
    { loading: artistLoading, error: artistError, data: artistData },
  ] = useLazyQuery<GetArtistByIdResponse>(GET_ARTIST_BY_ID);
  const [
    getAlbum,
    { loading: albumLoading, error: albumError, data: albumData },
  ] = useLazyQuery<GetAlbumByIdResponse>(GET_ALBUM_BY_ID);

  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-8 bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
        Interactive GraphQL Queries
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Artist Query */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-black dark:text-white">
            Query Artist by ID
          </h3>
          <div className="flex gap-2">
            <select
              value={selectedArtistId}
              onChange={(e) => setSelectedArtistId(e.target.value)}
              className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
            >
              <option value="">Select an artist...</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                selectedArtistId &&
                getArtist({ variables: { id: selectedArtistId } })
              }
              disabled={!selectedArtistId || artistLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {artistLoading ? "Loading..." : "Query"}
            </button>
          </div>

          {artistError && (
            <div className="text-red-500 text-sm">
              Error: {artistError.message}
            </div>
          )}

          {artistData?.artist && (
            <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md">
              <h4 className="font-medium text-black dark:text-white">
                {artistData.artist.name}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Genre: {artistData.artist.genre}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                Albums: {artistData.artist.albums.length}
              </p>
              <div className="mt-2 space-y-1">
                {artistData.artist.albums.map((album) => (
                  <div
                    key={album.id}
                    className="text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    • {album.title} ({album.releaseYear}) -{" "}
                    {album.tracks.length} tracks
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Album Query */}
        <div className="space-y-4">
          <h3 className="text-base font-medium text-black dark:text-white">
            Query Album by ID
          </h3>
          <div className="flex gap-2">
            <select
              value={selectedAlbumId}
              onChange={(e) => setSelectedAlbumId(e.target.value)}
              className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
            >
              <option value="">Select an album...</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                selectedAlbumId &&
                getAlbum({ variables: { id: selectedAlbumId } })
              }
              disabled={!selectedAlbumId || albumLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {albumLoading ? "Loading..." : "Query"}
            </button>
          </div>

          {albumError && (
            <div className="text-red-500 text-sm">
              Error: {albumError.message}
            </div>
          )}

          {albumData?.album && (
            <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md">
              <h4 className="font-medium text-black dark:text-white">
                {albumData.album.title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Artist: {albumData.album.artist.name}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Released: {albumData.album.releaseYear}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                Tracks: {albumData.album.tracks.length}
              </p>
              <div className="mt-2 space-y-1">
                {albumData.album.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    {track.trackNumber}. {track.title} (
                    {formatDuration(track.duration)})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
