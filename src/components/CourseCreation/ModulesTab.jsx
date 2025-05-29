import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const ModulesTab = ({ 
  modules, 
  setModules, 
  currentModule, 
  setCurrentModule, 
  addModule, 
  removeModule 
}) => {
  return (
    <motion.div
      key="modules"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center">
            <ApperIcon name="Layers" className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-surface-800">Course Modules</h3>
        </div>
        <span className="text-sm text-surface-600 bg-surface-100 px-3 py-1 rounded-full">
          {modules.length} modules
        </span>
      </div>

      {/* Add Module Form */}
      <div className="card-neu">
        <h4 className="text-lg font-semibold text-surface-800 mb-4">Add New Module</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={currentModule.title}
              onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
              className="input-field"
              placeholder="Module title"
            />
          </div>
          <div>
            <input
              type="text"
              value={currentModule.description}
              onChange={(e) => setCurrentModule({...currentModule, description: e.target.value})}
              className="input-field"
              placeholder="Module description"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={addModule} className="btn-secondary">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Module
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-50 rounded-xl p-4 border border-surface-200 hover:shadow-card transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    Module {index + 1}
                  </span>
                  <h5 className="text-lg font-semibold text-surface-800">{module.title}</h5>
                </div>
                {module.description && (
                  <p className="text-surface-600 text-sm">{module.description}</p>
                )}
                <div className="flex items-center space-x-4 mt-3">
                  <button className="text-xs text-primary hover:text-primary-dark font-medium flex items-center">
                    <ApperIcon name="FileText" className="w-3 h-3 mr-1" />
                    Add Content
                  </button>
                  <button className="text-xs text-secondary hover:text-secondary-dark font-medium flex items-center">
                    <ApperIcon name="Video" className="w-3 h-3 mr-1" />
                    Add Video
                  </button>
                  <button className="text-xs text-accent hover:text-yellow-600 font-medium flex items-center">
                    <ApperIcon name="Upload" className="w-3 h-3 mr-1" />
                    Upload Files
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeModule(module.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {modules.length === 0 && (
        <div className="text-center py-12 text-surface-500">
          <ApperIcon name="Layers" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No modules added yet. Create your first module above!</p>
        </div>
      )}
    </motion.div>
  );
};

export default ModulesTab;