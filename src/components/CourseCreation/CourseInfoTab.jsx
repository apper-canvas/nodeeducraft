import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const CourseInfoTab = ({ courseData, setCourseData, onSubmit }) => {
  return (
    <motion.div
      key="course"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
          <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-surface-800">Course Information</h3>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={courseData.title}
                onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                className="input-field"
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Category
              </label>
              <select
                value={courseData.category}
                onChange={(e) => setCourseData({...courseData, category: e.target.value})}
                className="input-field"
              >
                <option value="">Select Category</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="science">Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCourseData({...courseData, difficulty: level})}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      courseData.difficulty === level
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-surface-200 hover:border-surface-300'
                    }`}
                  >
                    <div className="capitalize font-medium text-sm">{level}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Course Description *
            </label>
            <textarea
              value={courseData.description}
              onChange={(e) => setCourseData({...courseData, description: e.target.value})}
              className="input-field h-32 resize-none"
              placeholder="Describe what students will learn..."
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Save & Continue
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CourseInfoTab;