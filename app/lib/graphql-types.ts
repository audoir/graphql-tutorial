import { Artist, Album, Track } from "./model";

// GraphQL response types
export interface ArtistWithAlbums extends Omit<Artist, "albumIds"> {
  albums: AlbumWithTracks[];
}

export interface AlbumWithArtist extends Omit<Album, "artistId" | "trackIds"> {
  artist: Pick<Artist, "id" | "name">;
  tracks: Track[];
}

export interface AlbumWithTracks extends Omit<Album, "artistId" | "trackIds"> {
  tracks: Track[];
}

export interface TrackWithAlbumAndArtist extends Omit<Track, "albumId"> {
  album: {
    id: string;
    title: string;
    artist: Pick<Artist, "id" | "name">;
  };
}

export interface GetAllDataResponse {
  artists: ArtistWithAlbums[];
  albums: AlbumWithArtist[];
  tracks: TrackWithAlbumAndArtist[];
}

export interface GetArtistByIdResponse {
  artist: ArtistWithAlbums;
}

export interface GetAlbumByIdResponse {
  album: {
    id: string;
    title: string;
    releaseYear: number;
    artist: Pick<Artist, "id" | "name" | "genre">;
    tracks: Track[];
  };
}
