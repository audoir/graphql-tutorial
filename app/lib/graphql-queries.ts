import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  query GetAllData {
    artists {
      id
      name
      genre
      albums {
        id
        title
        releaseYear
        tracks {
          id
          title
          duration
          trackNumber
        }
      }
    }
    albums {
      id
      title
      releaseYear
      artist {
        id
        name
      }
      tracks {
        id
        title
        duration
        trackNumber
      }
    }
    tracks {
      id
      title
      duration
      trackNumber
      album {
        id
        title
        artist {
          id
          name
        }
      }
    }
  }
`;

export const GET_ARTIST_BY_ID = gql`
  query GetArtistById($id: ID!) {
    artist(id: $id) {
      id
      name
      genre
      albums {
        id
        title
        releaseYear
        tracks {
          id
          title
          duration
          trackNumber
        }
      }
    }
  }
`;

export const GET_ALBUM_BY_ID = gql`
  query GetAlbumById($id: ID!) {
    album(id: $id) {
      id
      title
      releaseYear
      artist {
        id
        name
        genre
      }
      tracks {
        id
        title
        duration
        trackNumber
      }
    }
  }
`;

export const CREATE_ARTIST = gql`
  mutation CreateArtist($input: CreateArtistInput!) {
    createArtist(input: $input) {
      id
      name
      genre
      albums {
        id
        title
        releaseYear
        tracks {
          id
          title
          duration
          trackNumber
        }
      }
    }
  }
`;

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($input: CreateAlbumInput!) {
    createAlbum(input: $input) {
      id
      title
      releaseYear
      artist {
        id
        name
      }
      tracks {
        id
        title
        duration
        trackNumber
      }
    }
  }
`;

export const CREATE_TRACK = gql`
  mutation CreateTrack($input: CreateTrackInput!) {
    createTrack(input: $input) {
      id
      title
      duration
      trackNumber
      album {
        id
        title
        artist {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_ARTIST = gql`
  mutation DeleteArtist($id: ID!) {
    deleteArtist(id: $id)
  }
`;

export const DELETE_ALBUM = gql`
  mutation DeleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
  }
`;

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: ID!) {
    deleteTrack(id: $id)
  }
`;
