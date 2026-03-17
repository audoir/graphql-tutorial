"use client";

import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_ALBUM, DELETE_ALBUM, GET_ALL_DATA } from "../lib/graphql-queries";
import { AlbumWithArtist, ArtistWithAlbums } from "../lib/graphql-types";

interface AlbumsSectionProps {
  albums: AlbumWithArtist[];
  artists: ArtistWithAlbums[];
}

export default function AlbumsSection({ albums, artists }: AlbumsSectionProps) {
  const [createAlbum, { loading: createAlbumLoading }] = useMutation(
    CREATE_ALBUM,
    {
      refetchQueries: [{ query: GET_ALL_DATA }],
    },
  );
  const [deleteAlbum, { loading: deleteAlbumLoading }] = useMutation(
    DELETE_ALBUM,
    {
      refetchQueries: [{ query: GET_ALL_DATA }],
    },
  );

  const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artistId: "",
    releaseYear: new Date().getFullYear(),
  });

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbum.title || !newAlbum.artistId) return;

    try {
      await createAlbum({
        variables: {
          input: {
            title: newAlbum.title,
            artistId: newAlbum.artistId,
            releaseYear: newAlbum.releaseYear,
          },
        },
      });
      setNewAlbum({
        title: "",
        artistId: "",
        releaseYear: new Date().getFullYear(),
      });
      setShowCreateAlbumForm(false);
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this album?")) return;

    try {
      await deleteAlbum({ variables: { id } });
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Albums
        </h2>
        <button
          onClick={() => setShowCreateAlbumForm(!showCreateAlbumForm)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {showCreateAlbumForm ? "Cancel" : "Add Album"}
        </button>
      </div>

      {showCreateAlbumForm && (
        <form
          onSubmit={handleCreateAlbum}
          className="mb-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md"
        >
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Album title"
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
              required
            />
            <select
              value={newAlbum.artistId}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, artistId: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
              required
            >
              <option value="">Select artist...</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Release year"
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setNewAlbum({
                  ...newAlbum,
                  releaseYear: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
              min="1900"
              max={new Date().getFullYear() + 1}
              required
            />
            <button
              type="submit"
              disabled={createAlbumLoading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {createAlbumLoading ? "Creating..." : "Create Album"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {albums.map((album) => {
          return (
            <div
              key={album.id}
              className="border-b border-zinc-200 dark:border-zinc-700 pb-3 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-medium text-base text-black dark:text-white">
                  {album.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {album.artist.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  {album.releaseYear} • {album.tracks.length} track
                  {album.tracks.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => handleDelete(album.id)}
                disabled={deleteAlbumLoading}
                className="ml-2 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
