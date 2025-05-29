import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { toast } from 'react-toastify';

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('course');
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner'
  });
  
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState({
    title: '',
    description: '',
    content: []
  });
  
  const [quizData, setQuizData] = useState({
    title: '',
    questions: [],
    timeLimit: 30,
    passingScore: 70
  });
  
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'multiple',
    options: ['', '', '', ''],
    correct: 0
  });

  const tabs = [
    { id: 'course', label: 'Course Info', icon: 'BookOpen' },
    { id: 'modules', label: 'Modules', icon: 'Layers' },
    { id: 'quiz', label: 'Quiz Builder', icon: 'HelpCircle' },
    { id: 'preview', label: 'Preview', icon: 'Eye' }
  ];

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseData.title || !courseData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Course information saved successfully!');
    setActiveTab('modules');
  };

  const addModule = () => {
    if (!currentModule.title) {
      toast.error('Module title is required');
      return;
    }
    setModules([...modules, { ...currentModule, id: Date.now() }]);
    setCurrentModule({ title: '', description: '', content: [] });
    toast.success('Module added successfully!');
  };

  const removeModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
    toast.success('Module removed');
  };

  const addQuestion = () => {
    if (!currentQuestion.question) {
      toast.error('Question text is required');
      return;
    }
    if (currentQuestion.type === 'multiple' && currentQuestion.options.some(opt => !opt.trim())) {
      toast.error('All options must be filled');
      return;
    }
    
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, { ...currentQuestion, id: Date.now() }]
    });
    setCurrentQuestion({
      question: '',
      type: 'multiple',
      options: ['', '', '', ''],
      correct: 0
    });
    toast.success('Question added to quiz!');
  };

  const removeQuestion = (id) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter(q => q.id !== id)
    });
    toast.success('Question removed');
  };

  const publishCourse = () => {
    if (!courseData.title || modules.length === 0) {
      toast.error('Course must have a title and at least one module');
      return;
    }
    toast.success('Course published successfully! 🎉');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-soft border border-surface-200 overflow-hidden"
      >
        {/* Tab Navigation */}
        <div className="border-b border-surface-200 overflow-x-auto">
          <nav className="flex space-x-0 min-w-max lg:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-surface-600 hover:text-surface-800 hover:border-surface-300'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'course' && (
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

                <form onSubmit={handleCourseSubmit} className="space-y-6">
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
            )}

            {activeTab === 'modules' && (
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
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent to-red-500 rounded-xl flex items-center justify-center">
                      <ApperIcon name="HelpCircle" className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-surface-800">Quiz Builder</h3>
                  </div>
                  <span className="text-sm text-surface-600 bg-surface-100 px-3 py-1 rounded-full">
                    {quizData.questions.length} questions
                  </span>
                </div>

                {/* Quiz Settings */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="card-neu">
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Quiz Title
                    </label>
                    <input
                      type="text"
                      value={quizData.title}
                      onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                      className="input-field"
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div className="card-neu">
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      value={quizData.timeLimit}
                      onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value)})}
                      className="input-field"
                      min="1"
                      max="180"
                    />
                  </div>
                  <div className="card-neu">
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Passing Score (%)
                    </label>
                    <input
                      type="number"
                      value={quizData.passingScore}
                      onChange={(e) => setQuizData({...quizData, passingScore: parseInt(e.target.value)})}
                      className="input-field"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Add Question Form */}
                <div className="card-neu">
                  <h4 className="text-lg font-semibold text-surface-800 mb-4">Add New Question</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Question Text
                      </label>
                      <textarea
                        value={currentQuestion.question}
                        onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                        className="input-field h-20 resize-none"
                        placeholder="Enter your question here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Question Type
                      </label>
                      <select
                        value={currentQuestion.type}
                        onChange={(e) => setCurrentQuestion({...currentQuestion, type: e.target.value})}
                        className="input-field w-full lg:w-48"
                      >
                        <option value="multiple">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="short">Short Answer</option>
                      </select>
                    </div>

                    {currentQuestion.type === 'multiple' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="correct"
                              checked={currentQuestion.correct === index}
                              onChange={() => setCurrentQuestion({...currentQuestion, correct: index})}
                              className="w-4 h-4 text-primary"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...currentQuestion.options];
                                newOptions[index] = e.target.value;
                                setCurrentQuestion({...currentQuestion, options: newOptions});
                              }}
                              className="input-field flex-1"
                              placeholder={`Option ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {currentQuestion.type === 'true-false' && (
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="tf-correct"
                            checked={currentQuestion.correct === 0}
                            onChange={() => setCurrentQuestion({...currentQuestion, correct: 0, options: ['True', 'False']})}
                            className="w-4 h-4 text-primary"
                          />
                          <span>True</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="tf-correct"
                            checked={currentQuestion.correct === 1}
                            onChange={() => setCurrentQuestion({...currentQuestion, correct: 1, options: ['True', 'False']})}
                            className="w-4 h-4 text-primary"
                          />
                          <span>False</span>
                        </label>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button onClick={addQuestion} className="btn-secondary">
                        <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                        Add Question
                      </button>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                  {quizData.questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-surface-50 rounded-xl p-4 border border-surface-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                              Q{index + 1}
                            </span>
                            <span className="text-xs text-surface-500 bg-surface-200 px-2 py-1 rounded">
                              {question.type}
                            </span>
                          </div>
                          <p className="text-surface-800 font-medium mb-2">{question.question}</p>
                          {question.type === 'multiple' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className={`text-sm p-2 rounded ${
                                  optIndex === question.correct 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-white text-surface-600 border border-surface-200'
                                }`}>
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {quizData.questions.length === 0 && (
                  <div className="text-center py-12 text-surface-500">
                    <ApperIcon name="HelpCircle" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No questions added yet. Create your first question above!</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'preview' && (
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
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MainFeature;