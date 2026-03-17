import { artists, albums, tracks } from "@/public/database";

export const createArtist = (_: any, { input }: { input: { name: string; genre: string } }) => {
  const newArtist = {
    id: `artist-${Date.now()}`,
    name: input.name,
    genre: input.genre,
    albumIds: [],
  };
  artists.push(newArtist);
  return newArtist;
};

export const createAlbum = (_: any, { input }: { input: { title: string; artistId: string; releaseYear: number } }) => {
  const artist = artists.find((a) => a.id === input.artistId);
  if (!artist) {
    throw new Error(`Artist with id ${input.artistId} not found`);
  }
  
  const newAlbum = {
    id: `album-${Date.now()}`,
    title: input.title,
    artistId: input.artistId,
    releaseYear: input.releaseYear,
    trackIds: [],
  };
  
  albums.push(newAlbum);
  artist.albumIds.push(newAlbum.id);
  return newAlbum;
};

export const createTrack = (_: any, { input }: { input: { title: string; albumId: string; duration: number; trackNumber: number } }) => {
  const album = albums.find((a) => a.id === input.albumId);
  if (!album) {
    throw new Error(`Album with id ${input.albumId} not found`);
  }
  
  const newTrack = {
    id: `track-${Date.now()}`,
    title: input.title,
    albumId: input.albumId,
    duration: input.duration,
    trackNumber: input.trackNumber,
  };
  
  tracks.push(newTrack);
  album.trackIds.push(newTrack.id);
  return newTrack;
};

export const deleteArtist = (_: any, { id }: { id: string }) => {
  const artistIndex = artists.findIndex((artist) => artist.id === id);
  if (artistIndex === -1) return false;
  
  const artist = artists[artistIndex];
  // Delete associated albums and tracks
  artist.albumIds.forEach((albumId) => {
    const album = albums.find((a) => a.id === albumId);
    if (album) {
      // Delete tracks in this album
      album.trackIds.forEach((trackId) => {
        const trackIndex = tracks.findIndex((t) => t.id === trackId);
        if (trackIndex !== -1) tracks.splice(trackIndex, 1);
      });
      // Delete the album
      const albumIndex = albums.findIndex((a) => a.id === albumId);
      if (albumIndex !== -1) albums.splice(albumIndex, 1);
    }
  });
  
  artists.splice(artistIndex, 1);
  return true;
};

export const deleteAlbum = (_: any, { id }: { id: string }) => {
  const albumIndex = albums.findIndex((album) => album.id === id);
  if (albumIndex === -1) return false;
  
  const album = albums[albumIndex];
  // Delete associated tracks
  album.trackIds.forEach((trackId) => {
    const trackIndex = tracks.findIndex((t) => t.id === trackId);
    if (trackIndex !== -1) tracks.splice(trackIndex, 1);
  });
  
  // Remove album from artist's albumIds
  const artist = artists.find((a) => a.id === album.artistId);
  if (artist) {
    const albumIdIndex = artist.albumIds.indexOf(id);
    if (albumIdIndex !== -1) artist.albumIds.splice(albumIdIndex, 1);
  }
  
  albums.splice(albumIndex, 1);
  return true;
};

export const deleteTrack = (_: any, { id }: { id: string }) => {
  const trackIndex = tracks.findIndex((track) => track.id === id);
  if (trackIndex === -1) return false;
  
  const track = tracks[trackIndex];
  // Remove track from album's trackIds
  const album = albums.find((a) => a.id === track.albumId);
  if (album) {
    const trackIdIndex = album.trackIds.indexOf(id);
    if (trackIdIndex !== -1) album.trackIds.splice(trackIdIndex, 1);
  }
  
  tracks.splice(trackIndex, 1);
  return true;
};
