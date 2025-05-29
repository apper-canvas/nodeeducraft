import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import { toast } from 'react-toastify';

const CreateModuleModal = ({ 
  isOpen, 
  onClose, 
  currentModule, 
  setCurrentModule, 
  addModule 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('custom');

  const moduleTemplates = [
    { id: 'custom', name: 'Custom Module', description: 'Build from scratch' },
    { id: 'lecture', name: 'Lecture Module', description: 'Video lecture with resources' },
    { id: 'assignment', name: 'Assignment Module', description: 'Assignment with submission' },
    { id: 'reading', name: 'Reading Module', description: 'Text content with quiz' },
    { id: 'interactive', name: 'Interactive Module', description: 'Mixed content types' }
  ];

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCreateModule = () => {
    // Validate required fields
    if (!currentModule.title || currentModule.title.trim() === '') {
      toast.error('Please enter a module title before creating the module.');
      return;
    }

    if (currentModule.title.trim().length < 3) {
      toast.error('Module title must be at least 3 characters long.');
      return;
    }

    // Call the addModule function passed as prop
    try {
      addModule();
      // Reset form after successful creation
      setCurrentModule({ title: '', description: '', content: [] });
      setSelectedTemplate('custom');
      toast.success('Module created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create module. Please try again.');
    }
  };

  const createModuleFromTemplate = (template) => {
    let templateModule = {
      title: '',
      description: '',
      content: []
    };

    switch (template.id) {
      case 'lecture':
        templateModule.content = [
          { id: Date.now(), type: 'video', title: 'Lecture Video', description: '', content: '', duration: '00:00' },
          { id: Date.now() + 1, type: 'resource', title: 'Lecture Slides', description: '', content: '' },
          { id: Date.now() + 2, type: 'quiz', title: 'Knowledge Check', description: '', content: '' }
        ];
        break;
      case 'assignment':
        templateModule.content = [
          { id: Date.now(), type: 'lesson', title: 'Assignment Instructions', description: '', content: '' },
          { id: Date.now() + 1, type: 'assignment', title: 'Submit Assignment', description: '', content: '' },
          { id: Date.now() + 2, type: 'resource', title: 'Reference Materials', description: '', content: '' }
        ];
        break;
      case 'reading':
        templateModule.content = [
          { id: Date.now(), type: 'lesson', title: 'Reading Material', description: '', content: '' },
          { id: Date.now() + 1, type: 'quiz', title: 'Comprehension Quiz', description: '', content: '' }
        ];
        break;
      case 'interactive':
        templateModule.content = [
          { id: Date.now(), type: 'lesson', title: 'Introduction', description: '', content: '' },
          { id: Date.now() + 1, type: 'video', title: 'Demonstration', description: '', content: '', duration: '00:00' },
          { id: Date.now() + 2, type: 'assignment', title: 'Practice Exercise', description: '', content: '' },
          { id: Date.now() + 3, type: 'discussion', title: 'Discussion Forum', description: '', content: '' }
        ];
        break;
    }

    setCurrentModule(templateModule);
    setSelectedTemplate(template.id);
  };

  const handleReset = () => {
    setCurrentModule({ title: '', description: '', content: [] });
    setSelectedTemplate('custom');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center">
                <ApperIcon name="Plus" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-surface-800">Create New Module</h2>
                <p className="text-sm text-surface-600">Choose a template and configure your module</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Template Selection */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-3">Choose Template</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {moduleTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => createModuleFromTemplate(template)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 hover:shadow-lg ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/5 text-primary shadow-lg'
                        : 'border-surface-200 hover:border-surface-300 text-surface-700'
                    }`}
                  >
                    <h5 className="font-semibold text-sm mb-1">{template.name}</h5>
                    <p className="text-xs opacity-75">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Module Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Module Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentModule.title}
                  onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
                  className="input-field"
                  placeholder="Enter module title..."
                  autoFocus
                />
                {currentModule.title && currentModule.title.length < 3 && (
                  <p className="text-xs text-red-500 mt-1">Title must be at least 3 characters long</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Module Description</label>
                <input
                  type="text"
                  value={currentModule.description}
                  onChange={(e) => setCurrentModule({...currentModule, description: e.target.value})}
                  className="input-field"
                  placeholder="Brief module description..."
                />
              </div>
            </div>

            {/* Template Preview */}
            {selectedTemplate !== 'custom' && currentModule.content && currentModule.content.length > 0 && (
              <div className="bg-surface-50 rounded-xl p-4">
                <h4 className="font-medium text-surface-800 mb-3">Template Preview</h4>
                <div className="space-y-2">
                  {currentModule.content.map((content, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                        <ApperIcon name="FileText" className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-surface-600">{content.title}</span>
                      <span className="text-xs text-surface-400">({content.type})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-surface-200 bg-surface-50">
            <button 
              onClick={handleReset}
              className="px-4 py-2 text-surface-600 hover:text-surface-800 transition-colors"
            >
              Reset Form
            </button>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={onClose}
                className="px-6 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateModule} 
                className="btn-secondary flex items-center"
                disabled={!currentModule.title || currentModule.title.trim().length < 3}
              >
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Create Module
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateModuleModal;