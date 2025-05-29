import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const PreviewTab = ({ courseData, modules, quizData, publishCourse }) => {
  return (
    <motion.div
      key="preview"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <ApperIcon name="Eye" className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-surface-800">Course Preview</h3>
        </div>
        <button onClick={publishCourse} className="btn-primary">
          <ApperIcon name="Rocket" className="w-4 h-4 mr-2" />
          Publish Course
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Info Card */}
        <div className="lg:col-span-2">
          <div className="card-neu">
            <div className="aspect-video bg-gradient-to-r from-primary to-secondary rounded-xl mb-4 flex items-center justify-center">
              <ApperIcon name="Play" className="w-16 h-16 text-white" />
            </div>
            <h4 className="text-xl font-bold text-surface-800 mb-2">
              {courseData.title || 'Course Title'}
            </h4>
            <p className="text-surface-600 mb-4">
              {courseData.description || 'Course description will appear here...'}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {courseData.difficulty || 'beginner'}
                </span>
                {courseData.category && (
                  <span className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                    {courseData.category}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon key={i} name="Star" className="w-4 h-4 fill-current" />
                ))}
                <span className="text-sm text-surface-600 ml-2">4.8 (124 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="space-y-4">
          <div className="card-neu">
            <h5 className="font-semibold text-surface-800 mb-3">Course Statistics</h5>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-surface-600">Modules</span>
                <span className="font-medium">{modules.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600">Quiz Questions</span>
                <span className="font-medium">{quizData.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600">Estimated Duration</span>
                <span className="font-medium">{modules.length * 2}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600">Passing Score</span>
                <span className="font-medium">{quizData.passingScore}%</span>
              </div>
            </div>
          </div>

          <div className="card-neu">
            <h5 className="font-semibold text-surface-800 mb-3">Instructor</h5>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-surface-800">John Educator</div>
                <div className="text-sm text-surface-600">Senior Instructor</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Preview */}
      <div className="card-neu">
        <h5 className="font-semibold text-surface-800 mb-4">Course Content</h5>
        <div className="space-y-3">
          {modules.length > 0 ? modules.map((module, index) => (
            <div key={module.id} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-surface-800">{module.title}</div>
                  {module.description && (
                    <div className="text-sm text-surface-600">{module.description}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-surface-500">
                <ApperIcon name="Clock" className="w-4 h-4" />
                <span>30 min</span>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-surface-500">
              <ApperIcon name="BookOpen" className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No modules created yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Preview */}
      {quizData.questions.length > 0 && (
        <div className="card-neu">
          <h5 className="font-semibold text-surface-800 mb-4">Quiz Preview</h5>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h6 className="font-medium text-surface-800">
                {quizData.title || 'Course Quiz'}
              </h6>
              <div className="flex items-center space-x-4 text-sm text-surface-600">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Clock" className="w-4 h-4" />
                  <span>{quizData.timeLimit} min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Target" className="w-4 h-4" />
                  <span>{quizData.passingScore}%</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-surface-600">
              {quizData.questions.length} questions • Multiple attempts allowed
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PreviewTab;