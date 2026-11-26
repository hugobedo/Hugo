import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ExternalLink,
  Music,
  Pause,
  Play,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { MUSIC_TRACKS } from '../config/invitationConfig';

export interface MusicPlayerHandle {
  attemptStartPlayback: () => void;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
  getPlayerState: () => number;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState?: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface MusicPlayerProps {
  visible: boolean;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ visible }, ref) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [apiReady, setApiReady] = useState(false);
    const [embedBlocked, setEmbedBlocked] = useState(false);
    const [autoplayPrompt, setAutoplayPrompt] = useState(false);

    const playerRef = useRef<YTPlayer | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pendingPlayRef = useRef(false);
    const playbackCheckTimerRef = useRef<number | null>(null);

    const currentTrack = MUSIC_TRACKS[trackIndex];

    const clearPlaybackTimer = () => {
      if (playbackCheckTimerRef.current !== null) {
        window.clearTimeout(playbackCheckTimerRef.current);
        playbackCheckTimerRef.current = null;
      }
    };

    const scheduleAutoplayCheck = useCallback(() => {
      clearPlaybackTimer();
      playbackCheckTimerRef.current = window.setTimeout(() => {
        const player = playerRef.current;
        if (!player) {
          setAutoplayPrompt(true);
          return;
        }
        try {
          const state = player.getPlayerState();
          // 1 = PLAYING, 3 = BUFFERING
          if (state !== 1 && state !== 3) {
            setAutoplayPrompt(true);
          }
        } catch {
          setAutoplayPrompt(true);
        }
      }, 1800);
    }, []);

    // Load YouTube IFrame API script once
    useEffect(() => {
      if (window.YT && window.YT.Player) {
        setApiReady(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === 'function') {
          previousCallback();
        }
        setApiReady(true);
      };

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.onerror = () => {
          setEmbedBlocked(true);
        };
        document.body.appendChild(script);
      }

      return () => {
        clearPlaybackTimer();
      };
    }, []);

    // Initialize player once API is ready
    useEffect(() => {
      if (!apiReady || !containerRef.current || playerRef.current || !window.YT) {
        return;
      }

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: MUSIC_TRACKS[0].videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                try {
                  event.target.unMute();
                  event.target.playVideo();
                  scheduleAutoplayCheck();
                } catch {
                  setAutoplayPrompt(true);
                }
              }
            },
            onStateChange: (event) => {
              // 1: PLAYING, 2: PAUSED, 0: ENDED
              if (event.data === 1) {
                clearPlaybackTimer();
                setIsPlaying(true);
                setAutoplayPrompt(false);
                setEmbedBlocked(false);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Loop current track gently
                try {
                  playerRef.current?.playVideo();
                } catch {
                  setIsPlaying(false);
                }
              }
            },
            onError: () => {
              clearPlaybackTimer();
              setIsPlaying(false);
              setEmbedBlocked(true);
              setAutoplayPrompt(false);
            },
          },
        });
      } catch {
        setEmbedBlocked(true);
      }

      return () => {
        clearPlaybackTimer();
        try {
          playerRef.current?.destroy();
        } catch {
          // Ignore cleanup errors
        }
        playerRef.current = null;
      };
    }, [apiReady, scheduleAutoplayCheck]);

    const attemptStartPlayback = useCallback(() => {
      setEmbedBlocked(false);
      const player = playerRef.current;
      if (player) {
        try {
          player.unMute();
          setIsMuted(false);
          player.playVideo();
          scheduleAutoplayCheck();
        } catch {
          setAutoplayPrompt(true);
        }
      } else {
        pendingPlayRef.current = true;
        scheduleAutoplayCheck();
      }
    }, [scheduleAutoplayCheck]);

    useImperativeHandle(
      ref,
      () => ({
        attemptStartPlayback,
      }),
      [attemptStartPlayback]
    );

    const handleTogglePlay = () => {
      const player = playerRef.current;
      if (!player) {
        setAutoplayPrompt(true);
        setEmbedBlocked(true);
        return;
      }

      try {
        if (isPlaying) {
          player.pauseVideo();
          setIsPlaying(false);
        } else {
          if (isMuted) {
            player.unMute();
            setIsMuted(false);
          }
          setAutoplayPrompt(false);
          setEmbedBlocked(false);
          player.playVideo();
          scheduleAutoplayCheck();
        }
      } catch {
        setEmbedBlocked(true);
      }
    };

    const handleSwitchTrack = () => {
      const nextIndex = (trackIndex + 1) % MUSIC_TRACKS.length;
      setTrackIndex(nextIndex);
      setEmbedBlocked(false);
      setAutoplayPrompt(false);

      const player = playerRef.current;
      if (player) {
        try {
          player.loadVideoById(MUSIC_TRACKS[nextIndex].videoId);
          if (!isMuted) {
            player.unMute();
          }
          scheduleAutoplayCheck();
        } catch {
          setEmbedBlocked(true);
        }
      }
    };

    const handleToggleMute = () => {
      const player = playerRef.current;
      if (!player) return;

      try {
        if (isMuted) {
          player.unMute();
          setIsMuted(false);
        } else {
          player.mute();
          setIsMuted(true);
        }
      } catch {
        // Ignore mute error
      }
    };

    return (
      <>
        {/* Offscreen compliant container for YouTube IFrame API */}
        <div
          aria-hidden="true"
          className="fixed -left-[9999px] top-0 w-[240px] h-[160px] opacity-0 pointer-events-none overflow-hidden"
        >
          <div ref={containerRef} />
        </div>

        {/* Sticky Always-Visible Compact Music Bar (under 15% mobile height) */}
        {visible && (
          <aside
            aria-label="Controles de música de la invitación"
            className="fixed bottom-3 inset-x-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-[430px] z-40"
          >
            <div className="bg-[#FFFDF7]/95 backdrop-blur-md border-2 border-[#F47B1E]/35 shadow-xl rounded-2xl px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                {/* Track Info + One-Tap Start Prompt if Blocked */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF1E0] text-[#D95B00] flex items-center justify-center shrink-0">
                    <Music className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-extrabold text-[#2C1E14] truncate">
                      {currentTrack.label}
                    </p>
                    <p className="text-[11px] font-semibold text-[#5C4332] truncate">
                      {embedBlocked
                        ? 'Abre la canción en YouTube'
                        : autoplayPrompt
                          ? 'Toca reproducir para iniciar el sonido'
                          : isPlaying
                            ? isMuted
                              ? 'Sonando (silenciada)'
                              : 'Reproduciendo música'
                            : 'Música en pausa'}
                    </p>
                  </div>
                </div>

                {/* Touch-Friendly Controls (>=44px tap targets) */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-[#F47B1E] hover:bg-[#DC660E] text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0288D1]"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSwitchTrack}
                    aria-label={`Cambiar a ${MUSIC_TRACKS[(trackIndex + 1) % MUSIC_TRACKS.length].label}`}
                    title="Cambiar de canción"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-[#F2F9EC] hover:bg-[#E2F2D5] text-[#2F6B12] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0288D1]"
                  >
                    <SkipForward className="w-5 h-5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleMute}
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar música'}
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-[#EBF7FD] hover:bg-[#D6EFFB] text-[#0369A1] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0288D1]"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>

                  <a
                    href={currentTrack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${currentTrack.label} directamente en YouTube`}
                    title="Abrir en YouTube"
                    className={`min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0288D1] ${
                      embedBlocked
                        ? 'bg-[#D93829] hover:bg-[#B91C1C] text-white px-2.5 gap-1.5 text-xs font-bold whitespace-nowrap'
                        : 'bg-slate-100 hover:bg-slate-200 text-[#3E2C1E]'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {embedBlocked && <span>YouTube</span>}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        )}
      </>
    );
  }
);

MusicPlayer.displayName = 'MusicPlayer';
