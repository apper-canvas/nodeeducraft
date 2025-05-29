import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const QuizTab = ({ 
  quizData, 
  setQuizData, 
  currentQuestion, 
  setCurrentQuestion, 
  addQuestion, 
  removeQuestion 
}) => {
  return (
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
  );
};

export default QuizTab;