# GraphQL Tutorial - Music Database

A comprehensive GraphQL tutorial project built with Next.js, Apollo Server, and Apollo Client. This application demonstrates a complete GraphQL implementation with a music database featuring artists, albums, and tracks.

## Features

- **GraphQL API**: Full-featured GraphQL server with queries and mutations
- **Apollo Integration**: Apollo Server for the backend and Apollo Client for the frontend
- **Music Database**: Manage artists, albums, and tracks with relational data
- **Interactive UI**: Modern React components with Tailwind CSS styling
- **TypeScript**: Full type safety throughout the application
- **Real-time Updates**: Automatic UI updates when data changes

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **GraphQL**: Apollo Server, Apollo Client
- **Styling**: Tailwind CSS
- **Database**: In-memory data store (for tutorial purposes)

## Project Structure

```
app/
├── api/graphql/          # GraphQL API endpoint
│   └── route.ts         # Apollo Server setup and resolvers
├── components/          # React components
│   ├── ArtistsSection.tsx
│   ├── AlbumsSection.tsx
│   ├── TracksSection.tsx
│   └── InteractiveQueries.tsx
├── lib/
│   ├── model.ts         # GraphQL schema and TypeScript interfaces
│   ├── apollo-provider.tsx
│   └── graphql-queries.ts
└── page.tsx            # Main application page
public/
└── database.ts         # Sample data
```

## GraphQL Schema

The application includes three main types:

- **Artist**: Contains name, genre, and associated albums
- **Album**: Contains title, release year, artist, and tracks
- **Track**: Contains title, duration, track number, and album

### Available Queries

- `artists`: Get all artists
- `artist(id)`: Get a specific artist
- `albums`: Get all albums
- `album(id)`: Get a specific album
- `tracks`: Get all tracks
- `track(id)`: Get a specific track

### Available Mutations

- `createArtist(input)`: Create a new artist
- `createAlbum(input)`: Create a new album
- `createTrack(input)`: Create a new track
- `deleteArtist(id)`: Delete an artist
- `deleteAlbum(id)`: Delete an album
- `deleteTrack(id)`: Delete a track

## Getting Started

1. **Install dependencies**:

```bash
npm install
```

2. **Run the development server**:

```bash
npm run dev
```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

4. **Access GraphQL Playground**:
   Visit [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) to interact with the GraphQL API directly.

## Key Learning Points

This tutorial demonstrates:

- Setting up Apollo Server with Next.js API routes
- Creating GraphQL schemas with type definitions
- Writing resolvers for queries and mutations
- Implementing Apollo Client for frontend data fetching
- Managing relational data in GraphQL
- TypeScript integration with GraphQL
- Real-time UI updates with Apollo Client cache

## Development

The application uses:

- **Hot reloading**: Changes to components update automatically
- **Type safety**: Full TypeScript support for GraphQL operations
- **Modern React**: Uses React 19 features and hooks
- **Responsive design**: Tailwind CSS for mobile-friendly layouts
