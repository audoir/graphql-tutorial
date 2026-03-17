"use client";

import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_ARTIST, DELETE_ARTIST, GET_ALL_DATA } from "../lib/graphql-queries";
import { ArtistWithAlbums } from "../lib/graphql-types";

interface ArtistsSectionProps {
  artists: ArtistWithAlbums[];
}

export default function ArtistsSection({ artists }: ArtistsSectionProps) {
  const [createArtist, { loading: createArtistLoading }] = useMutation(
    CREATE_ARTIST,
    {
      refetchQueries: [{ query: GET_ALL_DATA }],
    },
  );
  const [deleteArtist, { loading: deleteArtistLoading }] = useMutation(
    DELETE_ARTIST,
    {
      refetchQueries: [{ query: GET_ALL_DATA }],
    },
  );

  const [showCreateArtistForm, setShowCreateArtistForm] = useState(false);
  const [newArtist, setNewArtist] = useState({ name: "", genre: "" });

  const handleCreateArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtist.name || !newArtist.genre) return;

    try {
      await createArtist({
        variables: { input: { name: newArtist.name, genre: newArtist.genre } },
      });
      setNewArtist({ name: "", genre: "" });
      setShowCreateArtistForm(false);
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this artist?")) return;

    try {
      await deleteArtist({ variables: { id } });
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Artists
        </h2>
        <button
          onClick={() => setShowCreateArtistForm(!showCreateArtistForm)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {showCreateArtistForm ? "Cancel" : "Add Artist"}
        </button>
      </div>

      {showCreateArtistForm && (
        <form
          onSubmit={handleCreateArtist}
          className="mb-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md"
        >
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Artist name"
              value={newArtist.name}
              onChange={(e) =>
                setNewArtist({ ...newArtist, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Genre"
              value={newArtist.genre}
              onChange={(e) =>
                setNewArtist({ ...newArtist, genre: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={createArtistLoading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {createArtistLoading ? "Creating..." : "Create Artist"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="border-b border-zinc-200 dark:border-zinc-700 pb-3 flex justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="font-medium text-base text-black dark:text-white">
                {artist.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {artist.genre}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                {artist.albums.length} album
                {artist.albums.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => handleDelete(artist.id)}
              disabled={deleteArtistLoading}
              className="ml-2 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
