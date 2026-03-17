import { Artist, Album, Track } from "@/app/lib/model";

export const artists: Artist[] = [
  {
    id: "artist-1",
    name: "The Beatles",
    genre: "Rock",
    albumIds: ["album-1", "album-2"],
  },
  {
    id: "artist-2",
    name: "Pink Floyd",
    genre: "Progressive Rock",
    albumIds: ["album-3"],
  },
  {
    id: "artist-3",
    name: "Miles Davis",
    genre: "Jazz",
    albumIds: ["album-4"],
  },
];

export const albums: Album[] = [
  {
    id: "album-1",
    title: "Abbey Road",
    artistId: "artist-1",
    releaseYear: 1969,
    trackIds: ["track-1", "track-2", "track-3"],
  },
  {
    id: "album-2",
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    artistId: "artist-1",
    releaseYear: 1967,
    trackIds: ["track-4", "track-5"],
  },
  {
    id: "album-3",
    title: "The Dark Side of the Moon",
    artistId: "artist-2",
    releaseYear: 1973,
    trackIds: ["track-6", "track-7", "track-8"],
  },
  {
    id: "album-4",
    title: "Kind of Blue",
    artistId: "artist-3",
    releaseYear: 1959,
    trackIds: ["track-9", "track-10"],
  },
];

export const tracks: Track[] = [
  {
    id: "track-1",
    title: "Come Together",
    albumId: "album-1",
    duration: 259,
    trackNumber: 1,
  },
  {
    id: "track-2",
    title: "Something",
    albumId: "album-1",
    duration: 183,
    trackNumber: 2,
  },
  {
    id: "track-3",
    title: "Here Comes the Sun",
    albumId: "album-1",
    duration: 185,
    trackNumber: 3,
  },
  {
    id: "track-4",
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    albumId: "album-2",
    duration: 122,
    trackNumber: 1,
  },
  {
    id: "track-5",
    title: "Lucy in the Sky with Diamonds",
    albumId: "album-2",
    duration: 208,
    trackNumber: 2,
  },
  {
    id: "track-6",
    title: "Speak to Me",
    albumId: "album-3",
    duration: 90,
    trackNumber: 1,
  },
  {
    id: "track-7",
    title: "Breathe",
    albumId: "album-3",
    duration: 163,
    trackNumber: 2,
  },
  {
    id: "track-8",
    title: "Time",
    albumId: "album-3",
    duration: 413,
    trackNumber: 3,
  },
  {
    id: "track-9",
    title: "So What",
    albumId: "album-4",
    duration: 544,
    trackNumber: 1,
  },
  {
    id: "track-10",
    title: "Freddie Freeloader",
    albumId: "album-4",
    duration: 578,
    trackNumber: 2,
  },
];
