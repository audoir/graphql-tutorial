import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs, Artist, Album, Track } from "@/app/lib/model";
import { artists, albums, tracks } from "@/public/database";
import {
  createArtist,
  createAlbum,
  createTrack,
  deleteArtist,
  deleteAlbum,
  deleteTrack,
} from "./mutation-resolvers";

const resolvers = {
  Query: {
    artists: () => artists,
    artist: (_: any, { id }: { id: string }) =>
      artists.find((artist) => artist.id === id),
    albums: () => albums,
    album: (_: any, { id }: { id: string }) =>
      albums.find((album) => album.id === id),
    tracks: () => tracks,
    track: (_: any, { id }: { id: string }) =>
      tracks.find((track) => track.id === id),
  },
  Mutation: {
    createArtist,
    createAlbum,
    createTrack,
    deleteArtist,
    deleteAlbum,
    deleteTrack,
  },
  Artist: {
    albums: (parent: Artist) =>
      albums.filter((album) => parent.albumIds.includes(album.id)),
  },
  Album: {
    artist: (parent: Album) =>
      artists.find((artist) => artist.id === parent.artistId),
    tracks: (parent: Album) =>
      tracks.filter((track) => parent.trackIds.includes(track.id)),
  },
  Track: {
    album: (parent: Track) => albums.find((album) => album.id === parent.albumId),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
