import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import { toast } from 'react-toastify';

const ModulesTab = ({ 
  modules, 
  setModules, 
  currentModule, 
  setCurrentModule, 
  addModule, 
  removeModule 
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [editingModule, setEditingModule] = useState(null);
  const [showAddContent, setShowAddContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('custom');

  const moduleTemplates = [
    { id: 'custom', name: 'Custom Module', description: 'Build from scratch' },
    { id: 'lecture', name: 'Lecture Module', description: 'Video lecture with resources' },
    { id: 'assignment', name: 'Assignment Module', description: 'Assignment with submission' },
    { id: 'reading', name: 'Reading Module', description: 'Text content with quiz' },
    { id: 'interactive', name: 'Interactive Module', description: 'Mixed content types' }
  ];

  const contentTypes = [
    { id: 'lesson', name: 'Text Lesson', icon: 'FileText', color: 'blue' },
    { id: 'video', name: 'Video Lecture', icon: 'Video', color: 'red' },
    { id: 'assignment', name: 'Assignment', icon: 'Edit3', color: 'green' },
    { id: 'resource', name: 'Resource File', icon: 'Download', color: 'purple' },
    { id: 'quiz', name: 'Mini Quiz', icon: 'HelpCircle', color: 'orange' },
    { id: 'discussion', name: 'Discussion', icon: 'MessageSquare', color: 'teal' }
  ];

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const startEditing = (module) => {
    setEditingModule({ ...module });
  };

  const saveModuleEdit = () => {
    setModules(modules.map(m => m.id === editingModule.id ? editingModule : m));
    setEditingModule(null);
    toast.success('Module updated successfully!');
  };

  const cancelEdit = () => {
    setEditingModule(null);
  };

  const duplicateModule = (module) => {
    const duplicated = {
      ...module,
      id: Date.now(),
      title: `${module.title} (Copy)`,
      status: 'draft'
    };
    setModules([...modules, duplicated]);
    toast.success('Module duplicated successfully!');
  };

  const updateModuleStatus = (moduleId, status) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, status } : m
    ));
    toast.success(`Module ${status} successfully!`);
  };

  const moveModule = (moduleId, direction) => {
    const currentIndex = modules.findIndex(m => m.id === moduleId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === modules.length - 1)
    ) {
      return;
    }

    const newModules = [...modules];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newModules[currentIndex], newModules[targetIndex]] = [newModules[targetIndex], newModules[currentIndex]];
    setModules(newModules);
    toast.success('Module order updated!');
  };

  const addContentToModule = (moduleId, contentType) => {
    const newContent = {
      id: Date.now(),
      type: contentType.id,
      title: `New ${contentType.name}`,
      description: '',
      content: '',
      duration: contentType.id === 'video' ? '00:00' : null,
      fileUrl: null,
      completed: false
    };

    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, content: [...(m.content || []), newContent] }
        : m
    ));
    setShowAddContent(null);
    toast.success(`${contentType.name} added to module!`);
  };

  const removeContentFromModule = (moduleId, contentId) => {
    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, content: (m.content || []).filter(c => c.id !== contentId) }
        : m
    ));
    toast.success('Content removed from module!');
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

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || module.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getContentIcon = (type) => {
    const contentType = contentTypes.find(ct => ct.id === type);
    return contentType ? contentType.icon : 'FileText';
  };

  const getContentColor = (type) => {
    const contentType = contentTypes.find(ct => ct.id === type);
    return contentType ? contentType.color : 'blue';
  };

  return (
    <motion.div
      key="modules"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center">
            <ApperIcon name="Layers" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-surface-800">Course Modules</h3>
            <p className="text-sm text-surface-600">Create and organize your course content</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ApperIcon name="Search" className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          
          <span className="text-sm text-surface-600 bg-surface-100 px-3 py-2 rounded-full">
            {filteredModules.length} of {modules.length} modules
          </span>
        </div>
      </div>

      {/* Module Templates */}
      <div className="card-neu">
        <h4 className="text-lg font-semibold text-surface-800 mb-4">Create New Module</h4>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-surface-700 mb-2">Choose Template</label>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {moduleTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => createModuleFromTemplate(template)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-surface-200 hover:border-surface-300 text-surface-700'
                }`}
              >
                <h5 className="font-medium text-sm">{template.name}</h5>
                <p className="text-xs opacity-75 mt-1">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Module Title</label>
            <input
              type="text"
              value={currentModule.title}
              onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
              className="input-field"
              placeholder="Enter module title..."
            />
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
        
        <div className="mt-4 flex justify-end space-x-3">
          <button 
            onClick={() => {
              setCurrentModule({ title: '', description: '', content: [] });
              setSelectedTemplate('custom');
            }}
            className="px-4 py-2 text-surface-600 hover:text-surface-800 transition-colors"
          >
            Reset
          </button>
          <button onClick={addModule} className="btn-secondary">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Create Module
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-surface-200 shadow-card overflow-hidden"
            >
              {/* Module Header */}
              <div className="p-4 border-b border-surface-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {editingModule && editingModule.id === module.id ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editingModule.title}
                          onChange={(e) => setEditingModule({...editingModule, title: e.target.value})}
                          className="input-field"
                          placeholder="Module title"
                        />
                        <input
                          type="text"
                          value={editingModule.description}
                          onChange={(e) => setEditingModule({...editingModule, description: e.target.value})}
                          className="input-field"
                          placeholder="Module description"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                            Module {index + 1}
                          </span>
                          <h5 className="text-lg font-semibold text-surface-800">{module.title}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(module.status || 'draft')}`}>
                            {module.status || 'draft'}
                          </span>
                        </div>
                        {module.description && (
                          <p className="text-surface-600 text-sm">{module.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-surface-500">
                          <span>{(module.content || []).length} content items</span>
                          <span>•</span>
                          <span>Est. {Math.max(1, Math.floor((module.content || []).length * 5))} min</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {editingModule && editingModule.id === module.id ? (
                      <>
                        <button
                          onClick={saveModuleEdit}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Check" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <ApperIcon name="X" className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => moveModule(module.id, 'up')}
                          disabled={index === 0}
                          className="p-2 text-surface-400 hover:text-surface-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ApperIcon name="ChevronUp" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveModule(module.id, 'down')}
                          disabled={index === filteredModules.length - 1}
                          className="p-2 text-surface-400 hover:text-surface-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ApperIcon name="ChevronDown" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => startEditing(module)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => duplicateModule(module)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Copy" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="p-2 text-surface-600 hover:text-surface-800 transition-colors"
                        >
                          <ApperIcon 
                            name={expandedModules.has(module.id) ? "ChevronUp" : "ChevronDown"} 
                            className="w-4 h-4" 
                          />
                        </button>
                        <button
                          onClick={() => removeModule(module.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Module Content */}
              <AnimatePresence>
                {expandedModules.has(module.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-surface-100"
                  >
                    <div className="p-4 space-y-3">
                      {/* Add Content Button */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <button
                          onClick={() => setShowAddContent(showAddContent === module.id ? null : module.id)}
                          className="btn-primary text-sm"
                        >
                          <ApperIcon name="Plus" className="w-3 h-3 mr-1" />
                          Add Content
                        </button>
                        
                        {/* Status Controls */}
                        <select
                          value={module.status || 'draft'}
                          onChange={(e) => updateModuleStatus(module.id, e.target.value)}
                          className="px-3 py-1 text-sm border border-surface-300 rounded focus:ring-1 focus:ring-primary"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      {/* Content Types Selector */}
                      {showAddContent === module.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-3 bg-surface-50 rounded-lg"
                        >
                          {contentTypes.map((contentType) => (
                            <button
                              key={contentType.id}
                              onClick={() => addContentToModule(module.id, contentType)}
                              className="p-3 text-center hover:bg-white rounded-lg transition-colors group"
                            >
                              <ApperIcon 
                                name={contentType.icon} 
                                className={`w-6 h-6 mx-auto mb-1 text-${contentType.color}-600 group-hover:scale-110 transition-transform`} 
                              />
                              <p className="text-xs font-medium text-surface-700">{contentType.name}</p>
                            </button>
                          ))}
                        </motion.div>
                      )}

                      {/* Content Items */}
                      <div className="space-y-2">
                        {(module.content || []).map((content, contentIndex) => (
                          <div
                            key={content.id}
                            className="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 bg-${getContentColor(content.type)}-100 rounded-lg flex items-center justify-center`}>
                                <ApperIcon 
                                  name={getContentIcon(content.type)} 
                                  className={`w-4 h-4 text-${getContentColor(content.type)}-600`} 
                                />
                              </div>
                              <div>
                                <h6 className="font-medium text-surface-800 text-sm">{content.title}</h6>
                                <p className="text-xs text-surface-600">
                                  {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                                  {content.duration && ` • ${content.duration}`}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  const updatedContent = prompt('Edit content title:', content.title);
                                  if (updatedContent) {
                                    setModules(modules.map(m =>
                                      m.id === module.id
                                        ? {
                                            ...m,
                                            content: m.content.map(c =>
                                              c.id === content.id ? { ...c, title: updatedContent } : c
                                            )
                                          }
                                        : m
                                    ));
                                    toast.success('Content updated!');
                                  }
                                }}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              >
                                <ApperIcon name="Edit" className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeContentFromModule(module.id, content.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <ApperIcon name="Trash2" className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {(module.content || []).length === 0 && (
                          <div className="text-center py-6 text-surface-400">
                            <ApperIcon name="FileText" className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No content added yet. Click "Add Content" to get started.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && modules.length > 0 && (
        <div className="text-center py-12 text-surface-500">
          <ApperIcon name="Search" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No modules match your search criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
            }}
            className="mt-2 text-primary hover:text-primary-dark font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {modules.length === 0 && (
        <div className="text-center py-12 text-surface-500">
          <ApperIcon name="Layers" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-semibold mb-2">No modules created yet</h4>
          <p>Start building your course by creating your first module above!</p>
        </div>
      )}
    </motion.div>
  );
};

export default ModulesTab;