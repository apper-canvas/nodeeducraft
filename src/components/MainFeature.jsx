import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { toast } from 'react-toastify';
import CourseInfoTab from './CourseCreation/CourseInfoTab';
import ModulesTab from './CourseCreation/ModulesTab';
import QuizTab from './CourseCreation/QuizTab';
import PreviewTab from './CourseCreation/PreviewTab';
import ContentLibrary from './ContentLibrary/ContentLibrary';

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
    { id: 'content', label: 'Content Library', icon: 'Video' },
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
              <CourseInfoTab 
                courseData={courseData}
                setCourseData={setCourseData}
                onSubmit={handleCourseSubmit}
              />
            )}

            {activeTab === 'modules' && (
              <ModulesTab 
                modules={modules}
                setModules={setModules}
                currentModule={currentModule}
                setCurrentModule={setCurrentModule}
                addModule={addModule}
                removeModule={removeModule}
              />
            )}

            {activeTab === 'content' && (
              <ContentLibrary />
            )}

            {activeTab === 'quiz' && (
              <QuizTab 
                quizData={quizData}
                setQuizData={setQuizData}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                addQuestion={addQuestion}
                removeQuestion={removeQuestion}
              />
            )}

            {activeTab === 'preview' && (
              <PreviewTab 
                courseData={courseData}
                modules={modules}
                quizData={quizData}
                publishCourse={publishCourse}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MainFeature;