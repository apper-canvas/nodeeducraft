import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import { toast } from 'react-toastify';

const VideoPlayer = ({ videoUrl, title, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(video.currentTime);
      }
    };

    const handleLoadedData = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleKeyPress = (e) => {
      if (e.target.tagName.toLowerCase() === 'input') return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadeddata', handleLoadedData);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadeddata', handleLoadedData);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentTime, volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seek = (time) => {
    const video = videoRef.current;
    if (video && time >= 0 && time <= duration) {
      video.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    seek(newTime);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      video.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        toast.error('Fullscreen not supported');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(window.controlsTimeout);
    window.controlsTimeout = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full max-w-6xl max-h-screen bg-black rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        >
          <ApperIcon name="X" className="w-6 h-6" />
        </button>

        {/* Video Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: showControls ? 0 : -50, opacity: showControls ? 1 : 0 }}
          className="absolute top-4 left-4 z-10 bg-black/50 px-4 py-2 rounded-lg"
        >
          <h3 className="text-white font-semibold">{title}</h3>
        </motion.div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Subtitles Overlay */}
        {showSubtitles && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded text-center max-w-2xl">
            <p>Sample subtitle text appears here...</p>
          </div>
        )}

        {/* Video Controls */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: showControls ? 0 : 100, opacity: showControls ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6"
        >
          {/* Progress Bar */}
          <div
            className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-4"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition-colors"
              >
                <ApperIcon 
                  name={isPlaying ? "Pause" : "Play"} 
                  className="w-8 h-8" 
                />
              </button>

              {/* Skip Buttons */}
              <button
                onClick={() => seek(currentTime - 10)}
                className="text-white hover:text-primary transition-colors"
              >
                <ApperIcon name="RotateCcw" className="w-6 h-6" />
              </button>
              <button
                onClick={() => seek(currentTime + 10)}
                className="text-white hover:text-primary transition-colors"
              >
                <ApperIcon name="RotateCw" className="w-6 h-6" />
              </button>

              {/* Volume Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-primary transition-colors"
                >
                  <ApperIcon 
                    name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
                    className="w-6 h-6" 
                  />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    if (newVolume > 0) setIsMuted(false);
                  }}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none slider"
                />
              </div>

              {/* Time Display */}
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Playback Speed */}
              <select
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm"
              >
                {playbackRates.map(rate => (
                  <option key={rate} value={rate} className="bg-black">
                    {rate}x
                  </option>
                ))}
              </select>

              {/* Subtitles Toggle */}
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`transition-colors ${
                  showSubtitles ? 'text-primary' : 'text-white hover:text-primary'
                }`}
              >
                <ApperIcon name="Captions" className="w-6 h-6" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-primary transition-colors"
              >
                <ApperIcon 
                  name={isFullscreen ? "Minimize" : "Maximize"} 
                  className="w-6 h-6" 
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Center Play Button Overlay */}
        {!isPlaying && !isLoading && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white/20 hover:bg-white/30 rounded-full p-6 transition-all duration-200">
              <ApperIcon name="Play" className="w-16 h-16 text-white" />
            </div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default VideoPlayer;