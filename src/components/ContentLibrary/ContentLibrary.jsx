import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import VideoPlayer from './VideoPlayer';
import { toast } from 'react-toastify';

const ContentLibrary = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Introduction to React Hooks',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      duration: '15:32',
      uploadDate: '2024-01-15',
      instructor: 'John Doe',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
      duration: '22:45',
      uploadDate: '2024-01-12',
      instructor: 'Jane Smith',
      category: 'Programming'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=200&fit=crop',
      duration: '18:20',
      uploadDate: '2024-01-10',
      instructor: 'Mike Johnson',
      category: 'Design'
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['all', 'Programming', 'Design', 'Business', 'Marketing', 'Science'];

  const filteredVideos = videos
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || video.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'oldest':
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'duration':
          return b.duration.localeCompare(a.duration);
        default:
          return 0;
      }
    });

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast.error('Video file size must be less than 100MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newVideo = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        url: URL.createObjectURL(file),
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
        duration: '0:00',
        uploadDate: new Date().toISOString().split('T')[0],
        instructor: 'Current User',
        category: 'Programming'
      };

      setVideos([newVideo, ...videos]);
      toast.success('Video uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteVideo = (videoId) => {
    setVideos(videos.filter(video => video.id !== videoId));
    toast.success('Video deleted successfully');
  };

  const openVideoPlayer = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <ApperIcon name="Video" className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-surface-800">Content Library</h3>
        </div>
        <div className="flex items-center space-x-3">
          <label className="btn-primary cursor-pointer">
            <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Video'}
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-neu">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Search Videos
            </label>
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by title..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="duration">Duration</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-surface-600 bg-surface-100 px-3 py-2 rounded-lg">
              {filteredVideos.length} videos found
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -5 }}
            className="card-neu group cursor-pointer overflow-hidden"
            onClick={() => openVideoPlayer(video)}
          >
            {/* Video Thumbnail */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 rounded-full p-3">
                  <ApperIcon name="Play" className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-surface-800 group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </h4>
              <div className="flex items-center justify-between text-sm text-surface-600">
                <span>{video.instructor}</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  {video.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-surface-500">
                  Uploaded: {new Date(video.uploadDate).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideoPlayer(video);
                    }}
                    className="text-primary hover:text-primary-dark p-1"
                    title="Play Video"
                  >
                    <ApperIcon name="Play" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit functionality would go here
                      toast.info('Edit functionality coming soon');
                    }}
                    className="text-secondary hover:text-secondary-dark p-1"
                    title="Edit Video"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this video?')) {
                        deleteVideo(video.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete Video"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12 text-surface-500">
          <ApperIcon name="Video" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No videos found</p>
          <p className="text-sm">
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Upload your first video to get started!'
            }
          </p>
        </div>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayer
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
            onClose={closeVideoPlayer}
          />
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      {isUploading && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-surface-200 z-40"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-surface-700">Uploading video...</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContentLibrary;