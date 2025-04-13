// Core types and interfaces for the audio player
import { type ReactNode } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  composer?: string;
  duration: string;
  coverArt: string;
  getSignedUrl: () => Promise<string>;
  type: 'audio/mp3' | 'audio/mp4' | 'audio/mpeg' | 'audio/webm' | 'audio/ogg' | 'audio/aac';
  genre?: string;
  priority?: boolean;
  instrument: 'Piano' | 'Pianos' | 'Guitar' | 'Guitars' | 'Band';
}

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  isBuffering: boolean;
  loadingTrackId: string | null;
  currentTime: number;
  duration: number;
  loadedProgress: number;
  audio: HTMLAudioElement | null;
}

export interface AudioError {
  message: string;
  code: number | undefined;
  name: string;
}

export interface AudioErrorHandler {
  handleError: (error: Error | null, context: string) => void;
  logDebug: (message: string, metadata?: Record<string, unknown>) => void;
}

// Component Props
export interface AudioPlayerProps {
  category: string;
  filename: string;
  onError?: (error: Error) => void;
  className?: string;
  showTitle?: boolean;
  title?: string;
  autoPlay?: boolean;
  onTrackEnd?: () => void;
}

export interface ControlButtonProps {
  onClick: () => void;
  icon: 'play' | 'pause' | 'next' | 'previous';
  label?: string;
  isActive?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface CurrentTrackInfoProps {
  track: Track;
  isLoading: boolean;
  isBuffering: boolean;
  isPlaying: boolean;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  controls: ReactNode;
}

export interface PlaylistItemProps {
  track: Track;
  currentTrack: Track;
  onPlay: (track: Track) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
  isLoading?: boolean;
  isPlaying?: boolean;
}

export interface TrackVisualizationProps {
  isPlaying: boolean;
}
