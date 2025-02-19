# Audio Player Component

A modern, feature-rich audio player built with React, TypeScript, and AWS S3 streaming capabilities. This component provides a seamless audio playback experience with advanced features like caching, preloading, and range requests.

## Code Structure

All code is located in the `app/audio/components/audio-player` directory:

- [`AudioPlayer.tsx`](./AudioPlayer.tsx) - Main component
- [`tracks.ts`](./tracks.ts) - Track management and caching
- [`ProgressBar.tsx`](./ProgressBar.tsx) - Progress tracking UI
- [`PlaylistItem.tsx`](./PlaylistItem.tsx) - Playlist item UI
- [`README.md`](./README.md) - This documentation

API Routes:

- [`app/api/audio/stream/route.ts`](/app/api/audio/stream/route.ts) - Streaming endpoint
- [`app/api/audio/sign-url/route.ts`](/app/api/audio/sign-url/route.ts) - URL signing endpoint

## Architecture

The audio player consists of several key components:

### Core Components

1. [`AudioPlayer.tsx`](./AudioPlayer.tsx)

   - Main component that orchestrates the entire player
   - Handles playback controls, progress tracking, and UI state
   - Uses custom hooks for audio state management

2. [`tracks.ts`](./tracks.ts)

   - Manages track metadata and audio file references
   - Implements caching and preloading strategies
   - Handles audio URL generation and streaming

3. [`ProgressBar.tsx`](./ProgressBar.tsx) & [`PlaylistItem.tsx`](./PlaylistItem.tsx)
   - Modular UI components for progress tracking and playlist display
   - Lazy-loaded for optimal performance

### Key Features

#### 1. Streaming Architecture

- Direct streaming from S3 via range requests
- Supports partial content loading (HTTP 206)
- CORS-enabled for cross-origin requests
- Handles various audio formats (MP3, M4A, WAV)

#### 2. Performance Optimizations

- LRU (Least Recently Used) caching system
- Memory usage monitoring and management
- Chunk-based loading for large files
- Preloading of upcoming tracks
- Lazy loading of UI components

#### 3. Error Handling & Recovery

- Automatic retry mechanism for failed loads
- Graceful degradation for unsupported features
- Comprehensive error reporting
- Memory leak prevention

## Implementation Details

### Audio Streaming

```typescript
// Stream endpoint structure
GET /api/audio/stream?key=audio/[instrument]/[filename]

// Example
/api/audio/stream?key=audio/piano/piano_midnight-the-stars-and-you.m4a
```

### File Structure

```
website/
├── app/
│   ├── api/
│   │   └── audio/
│   │       ├── stream/
│   │       │   └── route.ts       # Streaming endpoint
│   │       └── sign-url/
│   │           └── route.ts       # URL signing endpoint
│   └── audio/
│       └── components/
│           └── audio-player/
│               ├── AudioPlayer.tsx    # Main component
│               ├── tracks.ts          # Track management
│               ├── ProgressBar.tsx    # Progress UI
│               ├── PlaylistItem.tsx   # Playlist UI
│               └── README.md          # Documentation
└── public/
    └── audio/
        ├── piano/                  # Piano audio files
        │   ├── piano_midnight-the-stars-and-you.m4a
        │   ├── piano_christmas-time-is-here.m4a
        │   └── ...
        └── guitar/                 # Guitar audio files
            ├── guitar_violin-partita-3.m4a
            └── ...
```

### Track Configuration

```typescript
interface Track {
  id: string;
  title: string;
  artist: string;
  composer?: string;
  isOriginal: boolean;
  duration: string;
  coverArt: string;
  audioUrl: string;
  getSignedUrl: () => Promise<string>;
  type: 'audio/mp3' | 'audio/mp4' | 'audio/mpeg';
  genre?: string;
  instrument: 'guitar' | 'piano' | 'guitar/piano';
}
```

### Caching System

- Implements an LRU cache with a configurable size limit
- Monitors memory usage to prevent memory leaks
- Automatically evicts old entries when memory limit is reached
- Handles cleanup of audio resources

### Performance Configuration

```typescript
const CONFIG = {
  CACHE_SIZE: 5, // Number of tracks to cache
  PRELOAD_CHUNK_SIZE: 2, // Number of tracks to preload
  PRELOAD_DELAY: 100, // Delay between preloads (ms)
  CHUNK_SIZE: 1024 * 1024, // 1MB chunks for range requests
  PRELOAD_THRESHOLD: 0.1, // Start preloading at 10% from end
  RETRY_ATTEMPTS: 3, // Number of retry attempts
  RETRY_DELAY: 1000, // Base delay between retries (ms)
};
```

## Usage

1. **Basic Implementation**

```typescript
import AudioPlayer from './components/audio-player/AudioPlayer';

function App() {
  return <AudioPlayer />;
}
```

2. **Track Configuration**

```typescript
// In tracks.ts
export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Track Title',
    artist: 'Artist Name',
    instrument: 'piano',
    getSignedUrl: () => getAudioUrl('piano/track_file.m4a'),
    // ... other properties
  },
];
```

3. **Environment Setup**

```env
HETZNER_ACCESS_KEY=your_access_key
HETZNER_SECRET_KEY=your_secret_key
HETZNER_BUCKET_NAME=website-audio
HETZNER_ENDPOINT=your_endpoint
```

## Best Practices

1. **File Organization**

   - Store audio files in instrument-specific directories
   - Use consistent naming conventions: `[instrument]_[title].m4a`
   - Keep metadata separate from audio files

2. **Error Handling**

   - Implement retry logic for failed requests
   - Provide user feedback for loading states
   - Handle network errors gracefully

3. **Performance**

   - Use range requests for large files
   - Implement preloading for smooth playback
   - Monitor memory usage and clean up resources

4. **Security**
   - Implement proper CORS headers
   - Use environment variables for sensitive data
   - Validate file access permissions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallback support for older browsers
- Progressive enhancement for modern features
