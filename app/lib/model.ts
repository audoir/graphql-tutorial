export interface Artist {
  id: string;
  name: string;
  genre: string;
  albumIds: string[];
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  releaseYear: number;
  trackIds: string[];
}

export interface Track {
  id: string;
  title: string;
  albumId: string;
  duration: number; // in seconds
  trackNumber: number;
}

export const typeDefs = `#graphql
  type Artist {
    id: ID!
    name: String!
    genre: String!
    albums: [Album!]!
  }

  type Album {
    id: ID!
    title: String!
    releaseYear: Int!
    artist: Artist!
    tracks: [Track!]!
  }

  type Track {
    id: ID!
    title: String!
    duration: Int!
    trackNumber: Int!
    album: Album!
  }

  type Query {
    artists: [Artist!]!
    artist(id: ID!): Artist
    albums: [Album!]!
    album(id: ID!): Album
    tracks: [Track!]!
    track(id: ID!): Track
  }

  input CreateArtistInput {
    name: String!
    genre: String!
  }

  input CreateAlbumInput {
    title: String!
    artistId: ID!
    releaseYear: Int!
  }

  input CreateTrackInput {
    title: String!
    albumId: ID!
    duration: Int!
    trackNumber: Int!
  }

  type Mutation {
    createArtist(input: CreateArtistInput!): Artist!
    createAlbum(input: CreateAlbumInput!): Album!
    createTrack(input: CreateTrackInput!): Track!
    deleteArtist(id: ID!): Boolean!
    deleteAlbum(id: ID!): Boolean!
    deleteTrack(id: ID!): Boolean!
  }
`;
