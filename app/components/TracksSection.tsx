"use client";

import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { CREATE_TRACK, DELETE_TRACK, GET_ALL_DATA } from "../lib/graphql-queries";
import { TrackWithAlbumAndArtist, AlbumWithArtist } from "../lib/graphql-types";

interface TracksSectionProps {
  tracks: TrackWithAlbumAndArtist[];
  albums: AlbumWithArtist[];
}

export default function TracksSection({ tracks, albums }: TracksSectionProps) {
  const [createTrack, { loading: createTrackLoading }] = useMutation(
    CREATE_TRACK,
    {
      refetchQueries: [{ query: GET_ALL_DATA }],
    },
  );
  const [deleteTrack, { loading: deleteTrackLoading }] = useMutation(
    DELETE_TRACK,
    {
      refetchQueries: [{ query: GET_ALL_DATA }],
    },
  );

  const [showCreateTrackForm, setShowCreateTrackForm] = useState(false);
  const [newTrack, setNewTrack] = useState({
    title: "",
    albumId: "",
    duration: 180,
    trackNumber: 1,
  });

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCreateTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.albumId) return;

    try {
      await createTrack({
        variables: {
          input: {
            title: newTrack.title,
            albumId: newTrack.albumId,
            duration: newTrack.duration,
            trackNumber: newTrack.trackNumber,
          },
        },
      });
      setNewTrack({ title: "", albumId: "", duration: 180, trackNumber: 1 });
      setShowCreateTrackForm(false);
    } catch (error) {
      console.error("Error creating track:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this track?")) return;

    try {
      await deleteTrack({ variables: { id } });
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Tracks
        </h2>
        <button
          onClick={() => setShowCreateTrackForm(!showCreateTrackForm)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          {showCreateTrackForm ? "Cancel" : "Add Track"}
        </button>
      </div>

      {showCreateTrackForm && (
        <form
          onSubmit={handleCreateTrack}
          className="mb-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-md"
        >
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Track title"
              value={newTrack.title}
              onChange={(e) =>
                setNewTrack({ ...newTrack, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
              required
            />
            <select
              value={newTrack.albumId}
              onChange={(e) =>
                setNewTrack({ ...newTrack, albumId: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
              required
            >
              <option value="">Select album...</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title} - {album.artist.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Track number"
                value={newTrack.trackNumber}
                onChange={(e) =>
                  setNewTrack({
                    ...newTrack,
                    trackNumber: parseInt(e.target.value),
                  })
                }
                className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
                min="1"
                required
              />
              <input
                type="number"
                placeholder="Duration (seconds)"
                value={newTrack.duration}
                onChange={(e) =>
                  setNewTrack({
                    ...newTrack,
                    duration: parseInt(e.target.value),
                  })
                }
                className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-black dark:text-white"
                min="1"
                required
              />
            </div>
            <button
              type="submit"
              disabled={createTrackLoading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {createTrackLoading ? "Creating..." : "Create Track"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {tracks.map((track) => {
          return (
            <div
              key={track.id}
              className="border-b border-zinc-200 dark:border-zinc-700 pb-2 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-medium text-sm text-black dark:text-white">
                  {track.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {track.album.artist.name} • {track.album.title}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  Track {track.trackNumber} •{" "}
                  {formatDuration(track.duration)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(track.id)}
                disabled={deleteTrackLoading}
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
