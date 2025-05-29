import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import { toast } from 'react-toastify';

const EditVideoModal = ({ video, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: video.title,
    category: video.category,
    instructor: video.instructor,
    thumbnail: video.thumbnail
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const categories = ['Programming', 'Design', 'Business', 'Marketing', 'Science'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instructor name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
      newErrors.thumbnail = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedVideo = {
        ...video,
        ...formData,
        title: formData.title.trim(),
        instructor: formData.instructor.trim()
      };

      onSave(updatedVideo);
      toast.success('Video updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update video');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && handleCancel()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-secondary to-secondary-dark rounded-xl flex items-center justify-center">
              <ApperIcon name="Edit" className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-surface-800">Edit Video</h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-surface-400 hover:text-surface-600 transition-colors"
          >
            <ApperIcon name="X" className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Video Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter video title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Instructor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  className={`input-field ${errors.instructor ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter instructor name"
                />
                {errors.instructor && (
                  <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                  className={`input-field ${errors.thumbnail ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter thumbnail image URL"
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
                )}
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Preview
              </label>
              <div className="card-neu overflow-hidden">
                {/* Thumbnail Preview */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={formData.thumbnail || video.thumbnail}
                    alt={formData.title}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info Preview */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-surface-800 line-clamp-2">
                    {formData.title || 'Video Title'}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-surface-600">
                    <span>{formData.instructor || 'Instructor Name'}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      {formData.category || 'Category'}
                    </span>
                  </div>
                  <div className="text-xs text-surface-500">
                    Uploaded: {new Date(video.uploadDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-surface-200 bg-surface-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-surface-600 hover:text-surface-800 font-medium transition-colors"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary min-w-[100px]"
          >
            {isSaving ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              <>
                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditVideoModal;