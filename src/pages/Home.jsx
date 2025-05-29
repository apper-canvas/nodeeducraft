import MainFeature from '../components/MainFeature';
import ApperIcon from '../components/ApperIcon';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md border-b border-surface-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">EduCraft</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-surface-600 hover:text-primary transition-colors">Dashboard</a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors">Courses</a>
              <a href="#" className="text-surface-600 hover:text-primary transition-colors">Analytics</a>
              <button className="btn-primary">
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Create Course
              </button>
            </nav>
            <button className="md:hidden p-2">
              <ApperIcon name="Menu" className="w-6 h-6 text-surface-600" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-800 mb-6"
          >
            Create Amazing
            <span className="gradient-text"> Learning Experiences</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-surface-600 mb-8 max-w-3xl mx-auto"
          >
            Build comprehensive courses with videos, notes, quizzes, and interactive content. 
            EduCraft makes course creation intuitive and powerful.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Feature */}
      <MainFeature />

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: 'BookOpen', value: '10K+', label: 'Courses Created' },
              { icon: 'Users', value: '50K+', label: 'Active Students' },
              { icon: 'Award', value: '95%', label: 'Completion Rate' },
              { icon: 'Star', value: '4.9', label: 'Average Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-neu text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-surface-800 mb-2">{stat.value}</div>
                <div className="text-surface-600 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-surface-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">EduCraft</h3>
              </div>
              <p className="text-surface-300 mb-4 max-w-md">
                Empowering educators worldwide with innovative course creation tools and comprehensive learning management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Course Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-700 mt-8 pt-8 text-center text-surface-400">
            <p>&copy; 2024 EduCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;