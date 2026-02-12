"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, 
  FaBook, 
  FaShoppingBag, 
  FaQuestionCircle, 
  FaTasks, 
  FaChartLine, 
  FaCog,
  FaSearch,
  FaPlayCircle,
  FaInfoCircle,
  FaShoppingCart,
  FaEye,
  FaStar,
  FaPlay,
  FaChartBar,
  FaRedo,
  FaCheck,
  FaUpload,
  FaComment,
  FaCloudUploadAlt,
  FaFolderOpen,
  FaPaperPlane,
  FaTimes,
  FaArrowLeft
} from 'react-icons/fa';

// Types
interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  progress: number;
  watched: boolean;
}

interface Module {
  id: number;
  title: string;
  videos: number[];
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
  category: string;
  currentVideo?: number;
  videos?: Video[];
  modules?: Module[];
  rating?: number;
  price?: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: number;
  title: string;
  course: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  attemptsAllowed: number;
  attemptsUsed: number;
  score: number;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  description: string;
  status: 'not-started' | 'accepted' | 'submitted' | 'graded';
  dueDate: string;
  points: number;
  instructions: string;
  submissionType: 'file' | 'text' | 'both';
  fileTypes: string[];
  maxFileSize: number;
  submittedFile: string | null;
  submittedText: string;
  grade: number | null;
  feedback: string;
}

// Sample Data
const coursesData = {
  current: [
    {
      id: 1,
      title: "Advanced Web Development",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      lastAccessed: "2 days ago",
      category: "Programming",
      currentVideo: 2,
      videos: [
        {
          id: 1,
          title: "Introduction to HTML",
          description: "In this video, we'll cover the basics of HTML structure, tags, and elements.",
          duration: "15:30",
          thumbnail: "https://example.com/thumb1.jpg",
          videoUrl: "https://example.com/videos/html-intro.mp4",
          progress: 100,
          watched: true
        },
        {
          id: 2,
          title: "CSS Fundamentals",
          description: "Learn how to style your web pages with CSS.",
          duration: "22:15",
          thumbnail: "https://example.com/thumb2.jpg",
          videoUrl: "https://example.com/videos/css-fundamentals.mp4",
          progress: 65,
          watched: false
        }
      ],
      modules: [
        {
          id: 1,
          title: "HTML Fundamentals",
          videos: [1]
        },
        {
          id: 2,
          title: "CSS Styling",
          videos: [2]
        }
      ]
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Prof. Michael Chen",
      progress: 40,
      lastAccessed: "5 days ago",
      category: "Data Science"
    },
    {
      id: 3,
      title: "Mobile App Development",
      instructor: "Fatima Khan",
      progress: 20,
      lastAccessed: "1 week ago",
      category: "Mobile Development"
    },
    {
      id: 4,
      title: "Islamic History & Civilization",
      instructor: "Dr. Ahmed Hassan",
      progress: 60,
      lastAccessed: "3 days ago",
      category: "Islamic Studies"
    }
  ],
  purchased: [
    {
      id: 5,
      title: "UI/UX Design Principles",
      instructor: "Aisha Rahman",
      progress: 100,
      lastAccessed: "3 weeks ago",
      category: "Design"
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      instructor: "Omar Farooq",
      progress: 100,
      lastAccessed: "1 month ago",
      category: "Marketing"
    },
    {
      id: 7,
      title: "Quranic Arabic",
      instructor: "Dr. Yusuf Ibrahim",
      progress: 100,
      lastAccessed: "2 months ago",
      category: "Islamic Studies"
    }
  ]
};

const quizzesData: Quiz[] = [
  {
    id: 1,
    title: "Web Development Fundamentals Quiz",
    course: "Advanced Web Development",
    description: "Test your knowledge of HTML, CSS, and JavaScript fundamentals.",
    status: "not-started",
    questions: [
      {
        id: 1,
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        text: "Which CSS property is used to change the text color?",
        options: [
          "text-color",
          "font-color",
          "color",
          "text-style"
        ],
        correctAnswer: 2
      }
    ],
    timeLimit: 30,
    passingScore: 70,
    attemptsAllowed: 3,
    attemptsUsed: 0,
    score: 0
  },
  {
    id: 2,
    title: "Data Science Concepts Quiz",
    course: "Data Science Fundamentals",
    description: "Evaluate your understanding of data science principles and techniques.",
    status: "completed",
    questions: [
      {
        id: 1,
        text: "What is the primary purpose of data normalization?",
        options: [
          "To remove outliers from the dataset",
          "To scale data to a specific range",
          "To convert categorical data to numerical",
          "To reduce the dimensionality of data"
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 20,
    passingScore: 60,
    attemptsAllowed: 2,
    attemptsUsed: 1,
    score: 85
  }
];

const assignmentsData: Assignment[] = [
  {
    id: 1,
    title: "Responsive Portfolio Website",
    course: "Advanced Web Development",
    description: "Create a responsive portfolio website using HTML, CSS, and JavaScript.",
    status: "not-started",
    dueDate: "2023-12-15",
    points: 100,
    instructions: "Use semantic HTML, CSS Flexbox/Grid for layout.",
    submissionType: "file",
    fileTypes: [".zip", ".html", ".css", ".js"],
    maxFileSize: 10,
    submittedFile: null,
    submittedText: "",
    grade: null,
    feedback: ""
  },
  {
    id: 2,
    title: "Data Analysis Report",
    course: "Data Science Fundamentals",
    description: "Analyze the provided dataset and create a comprehensive report with visualizations.",
    status: "accepted",
    dueDate: "2023-12-10",
    points: 150,
    instructions: "Use Python with pandas, matplotlib, and seaborn.",
    submissionType: "both",
    fileTypes: [".pdf", ".ipynb"],
    maxFileSize: 5,
    submittedFile: null,
    submittedText: "",
    grade: null,
    feedback: ""
  },
  {
    id: 3,
    title: "Mobile App Wireframe",
    course: "Mobile App Development",
    description: "Design wireframes for a mobile application.",
    status: "submitted",
    dueDate: "2023-11-30",
    points: 80,
    instructions: "Use any wireframing tool of your choice.",
    submissionType: "file",
    fileTypes: [".pdf", ".png", ".jpg"],
    maxFileSize: 5,
    submittedFile: "wireframe_project.pdf",
    submittedText: "",
    grade: 92,
    feedback: "Excellent work! Your wireframes are well thought out."
  }
];

const StudentDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [courses, setCourses] = useState(coursesData);
  const [quizzes, setQuizzes] = useState(quizzesData);
  const [assignments, setAssignments] = useState(assignmentsData);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{[key: number]: number}>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'current-courses', label: 'Current Courses', icon: FaBook },
    { id: 'purchased-courses', label: 'Purchased Courses', icon: FaShoppingBag },
    { id: 'quizzes', label: 'Quizzes', icon: FaQuestionCircle },
    { id: 'assignments', label: 'Assignments', icon: FaTasks },
    { id: 'progress', label: 'Progress & Stats', icon: FaChartLine },
    { id: 'settings', label: 'Account Settings', icon: FaCog }
  ];

  // Course Card Component
  const CourseCard: React.FC<{ course: Course; showProgress?: boolean }> = ({ 
    course, 
    showProgress = false 
  }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="h-44 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-orange-500 font-semibold text-sm mb-3">{course.instructor}</p>
        
        {showProgress && (
          <>
            <div className="mb-3">
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                  style={{ width: ${course.progress}% }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>Last accessed: {course.lastAccessed}</span>
              <span>{course.progress}% complete</span>
            </div>
          </>
        )}
        
        {!showProgress && (
          <div className="flex justify-between text-xs text-gray-400 mb-3">
            <span className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" /> 4.8/5.0
            </span>
            <span>$79.99</span>
          </div>
        )}

        <div className="flex gap-2">
          {showProgress ? (
            <>
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <FaPlayCircle /> Continue
              </button>
              <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
                <FaInfoCircle /> Details
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors hover:shadow-lg">
                <FaShoppingCart /> Enroll Now
              </button>
              <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
                <FaEye /> Preview
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Quiz Component
  const QuizComponent: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
    const getStatusInfo = (status: string) => {
      switch (status) {
        case 'not-started':
          return { text: 'Not Started', class: 'bg-red-500/20 text-red-500' };
        case 'in-progress':
          return { text: 'In Progress', class: 'bg-yellow-500/20 text-yellow-500' };
        case 'completed':
          return { text: 'Completed', class: 'bg-green-500/20 text-green-500' };
        default:
          return { text: 'Unknown', class: '' };
      }
    };

    const statusInfo = getStatusInfo(quiz.status);

    const renderActions = () => {
      switch (quiz.status) {
        case 'not-started':
          return (
            <button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => startQuiz(quiz)}
            >
              <FaPlay /> Start Quiz
            </button>
          );
        case 'in-progress':
          return (
            <button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => startQuiz(quiz)}
            >
              <FaPlay /> Continue Quiz
            </button>
          );
        case 'completed':
          return (
            <div className="flex gap-2">
              <button 
                className="bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
                onClick={() => showQuizResults(quiz)}
              >
                <FaChartBar /> View Results
              </button>
              {quiz.attemptsUsed < quiz.attemptsAllowed && (
                <button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => retakeQuiz(quiz)}
                >
                  <FaRedo /> Retake Quiz
                </button>
              )}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20 mb-5">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
          <span className={px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.class}}>
            {statusInfo.text}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{quiz.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Course</span>
            <span className="text-white font-semibold">{quiz.course}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Time Limit</span>
            <span className="text-white font-semibold">{quiz.timeLimit} minutes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Passing Score</span>
            <span className="text-white font-semibold">{quiz.passingScore}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Attempts</span>
            <span className="text-white font-semibold">{quiz.attemptsUsed}/{quiz.attemptsAllowed}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {renderActions()}
        </div>
      </div>
    );
  };

  // Assignment Component
  const AssignmentComponent: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
    const getStatusInfo = (status: string) => {
      switch (status) {
        case 'not-started':
          return { text: 'Not Started', class: 'bg-red-500/20 text-red-500' };
        case 'accepted':
          return { text: 'Accepted', class: 'bg-yellow-500/20 text-yellow-500' };
        case 'submitted':
          return { text: 'Submitted', class: 'bg-green-500/20 text-green-500' };
        case 'graded':
          return { text: 'Graded', class: 'bg-green-500/20 text-green-500' };
        default:
          return { text: 'Unknown', class: '' };
      }
    };

    const statusInfo = getStatusInfo(assignment.status);

    const renderActions = () => {
      switch (assignment.status) {
        case 'not-started':
          return (
            <button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => acceptAssignment(assignment)}
            >
              <FaCheck /> Accept Assignment
            </button>
          );
        case 'accepted':
          return (
            <button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => showSubmissionForm(assignment)}
            >
              <FaUpload /> Submit Assignment
            </button>
          );
        case 'submitted':
        case 'graded':
          return (
            <button 
              className="bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
              onClick={() => viewSubmission(assignment)}
            >
              <FaEye /> View {assignment.status === 'graded' ? 'Feedback' : 'Submission'}
            </button>
          );
        default:
          return null;
      }
    };

    return (
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20 mb-5">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">{assignment.title}</h3>
          <span className={px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.class}}>
            {statusInfo.text}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{assignment.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Course</span>
            <span className="text-white font-semibold">{assignment.course}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Due Date</span>
            <span className="text-white font-semibold">{assignment.dueDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Points</span>
            <span className="text-white font-semibold">{assignment.points}</span>
          </div>
          {assignment.grade && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Grade</span>
              <span className="text-white font-semibold">{assignment.grade}/{assignment.points}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {renderActions()}
        </div>
      </div>
    );
  };

  // Active Quiz Component
  const ActiveQuiz: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
    const handleOptionSelect = (questionId: number, optionIndex: number) => {
      setSelectedOptions(prev => ({
        ...prev,
        [questionId]: optionIndex
      }));
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return ${mins}:${secs < 10 ? '0' : ''}${secs};
    };

    return (
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-500">
            In Progress
          </span>
        </div>
        <p className="text-gray-400 mb-4">{quiz.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Time Remaining</span>
            <span className="text-white font-semibold">{formatTime(timeRemaining)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Questions</span>
            <span className="text-white font-semibold">{quiz.questions.length}</span>
          </div>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); submitQuiz(); }}>
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="mb-6 pb-4 border-b border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-3">{index + 1}. {question.text}</h4>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      selectedOptions[question.id] === optionIndex 
                        ? 'bg-orange-500/20 border border-orange-500' 
                        : 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                    }`}
                    onClick={() => handleOptionSelect(question.id, optionIndex)}
                  >
                    <input 
                      type="radio" 
                      name={question-${question.id}}
                      checked={selectedOptions[question.id] === optionIndex}
                      readOnly
                      className="mr-3"
                    />
                    <label className="text-white font-medium cursor-pointer">{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex gap-2">
            <button 
              type="button" 
              className="bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
              onClick={() => {
                if (confirm('Are you sure you want to cancel the quiz? Your progress will be lost.')) {
                  setCurrentQuiz(null);
                }
              }}
            >
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <FaPaperPlane /> Submit Quiz
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Assignment Submission Component
  const AssignmentSubmission: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Check file type
        const fileExtension = '.' + file.name.split('.').pop();
        if (!assignment.fileTypes.includes(fileExtension)) {
          alert(Invalid file type. Allowed types: ${assignment.fileTypes.join(', ')});
          return;
        }
        
        // Check file size
        if (file.size > assignment.maxFileSize * 1024 * 1024) {
          alert(File size exceeds the limit of ${assignment.maxFileSize}MB);
          return;
        }
        
        setSubmissionFile(file);
      }
    };

    return (
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Submit: {assignment.title}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-500">
            Accepted
          </span>
        </div>
        
        <p className="text-gray-400 mb-4">{assignment.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Due Date</span>
            <span className="text-white font-semibold">{assignment.dueDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Points</span>
            <span className="text-white font-semibold">{assignment.points}</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">Instructions:</h4>
          <p className="text-gray-400">{assignment.instructions}</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submitAssignment(); }}>
          {(assignment.submissionType === 'file' || assignment.submissionType === 'both') && (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-4 hover:border-orange-500 transition-colors">
              <FaCloudUploadAlt className="text-5xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Drag & drop your file here or click to browse</p>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                accept={assignment.fileTypes.join(',')}
                id="file-input"
              />
              <button 
                type="button" 
                className="bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors mx-auto"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <FaFolderOpen /> Browse Files
              </button>
              {submissionFile && (
                <div className="mt-4 text-orange-500 font-semibold">{submissionFile.name}</div>
              )}
            </div>
          )}

          {(assignment.submissionType === 'text' || assignment.submissionType === 'both') && (
            <div className="mb-4">
              <span className="text-sm text-gray-400 mb-2 block">Text Submission</span>
              <textarea 
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={6}
                placeholder="Enter your submission text here..."
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white resize-vertical focus:border-orange-500 focus:outline-none"
              />
            </div>
          )}

          <div className="flex gap-2">
            <button 
              type="button" 
              className="bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
              onClick={() => setCurrentAssignment(null)}
            >
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <FaPaperPlane /> Submit Assignment
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Quiz Functions
  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setTimeRemaining(quiz.timeLimit * 60);
    const updatedQuizzes = quizzes.map(q => 
      q.id === quiz.id ? { ...q, status: 'in-progress' as const } : q
    );
    setQuizzes(updatedQuizzes);
  };

  const submitQuiz = () => {
    if (!currentQuiz) return;

    // Calculate score
    let correctAnswers = 0;
    currentQuiz.questions.forEach(question => {
      if (selectedOptions[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100);

    // Update quiz
    const updatedQuizzes = quizzes.map(q =>
      q.id === currentQuiz.id ? {
        ...q,
        status: 'completed' as const,
        score,
        attemptsUsed: q.attemptsUsed + 1
      } : q
    );

    setQuizzes(updatedQuizzes);
    setCurrentQuiz(null);
    setSelectedOptions({});
  };

  const showQuizResults = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
  };

  const retakeQuiz = (quiz: Quiz) => {
    const updatedQuizzes = quizzes.map(q =>
      q.id === quiz.id ? {
        ...q,
        status: 'not-started' as const,
        score: 0
      } : q
    );
    setQuizzes(updatedQuizzes);
    setCurrentQuiz(null);
  };

  // Assignment Functions
  const acceptAssignment = (assignment: Assignment) => {
    const updatedAssignments = assignments.map(a =>
      a.id === assignment.id ? { ...a, status: 'accepted' as const } : a
    );
    setAssignments(updatedAssignments);
    alert('Assignment accepted! You can now work on it and submit when ready.');
  };

  const showSubmissionForm = (assignment: Assignment) => {
    setCurrentAssignment(assignment);
    setSubmissionFile(null);
    setSubmissionText('');
  };

  const submitAssignment = () => {
    if (!currentAssignment) return;

    let hasSubmission = false;

    if (currentAssignment.submissionType === 'file' || currentAssignment.submissionType === 'both') {
      if (submissionFile) {
        hasSubmission = true;
      }
    }

    if (currentAssignment.submissionType === 'text' || currentAssignment.submissionType === 'both') {
      if (submissionText.trim() !== '') {
        hasSubmission = true;
      }
    }

    if (!hasSubmission) {
      alert('Please provide a file or text submission.');
      return;
    }

    const updatedAssignments = assignments.map(a =>
      a.id === currentAssignment.id ? {
        ...a,
        status: 'submitted' as const,
        submittedFile: submissionFile ? submissionFile.name : null,
        submittedText: submissionText
      } : a
    );

    setAssignments(updatedAssignments);
    setCurrentAssignment(null);
    setSubmissionFile(null);
    setSubmissionText('');
    alert('Assignment submitted successfully!');
  };

  const viewSubmission = (assignment: Assignment) => {
    setCurrentAssignment(assignment);
  };

  // Timer effect for quizzes
  useEffect(() => {
    if (timeRemaining <= 0 || !currentQuiz) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, currentQuiz]);

  // Render current section
  const renderSection = () => {
    if (currentQuiz && currentQuiz.status === 'in-progress') {
      return <ActiveQuiz quiz={currentQuiz} />;
    }

    if (currentQuiz && currentQuiz.status === 'completed') {
      return (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">{currentQuiz.title} - Results</h3>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-500">
              Completed
            </span>
          </div>
          <div className="text-center py-8">
            <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
              {currentQuiz.score}%
            </div>
            <div 
              className={`text-xl font-semibold mb-6 ${
                currentQuiz.score >= currentQuiz.passingScore ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {currentQuiz.score >= currentQuiz.passingScore 
                ? 'Congratulations! You passed the quiz.' 
                : 'You did not pass the quiz. You can retake it if you have attempts remaining.'
              }
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 mb-1">Correct Answers</span>
                <span className="text-white font-semibold">
                  {Math.round(currentQuiz.score / 100 * currentQuiz.questions.length)}/{currentQuiz.questions.length}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 mb-1">Passing Score</span>
                <span className="text-white font-semibold">{currentQuiz.passingScore}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 mb-1">Attempts</span>
                <span className="text-white font-semibold">{currentQuiz.attemptsUsed}/{currentQuiz.attemptsAllowed}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className="bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
              onClick={() => setCurrentQuiz(null)}
            >
              <FaArrowLeft /> Back to Quizzes
            </button>
            {currentQuiz.attemptsUsed < currentQuiz.attemptsAllowed && (
              <button 
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => retakeQuiz(currentQuiz)}
              >
                <FaRedo /> Retake Quiz
              </button>
            )}
          </div>
        </div>
      );
    }

    if (currentAssignment && currentAssignment.status === 'accepted') {
      return <AssignmentSubmission assignment={currentAssignment} />;
    }

    if (currentAssignment && (currentAssignment.status === 'submitted' || currentAssignment.status === 'graded')) {
      return (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">{currentAssignment.title} - Submission</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentAssignment.grade ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
            }`}>
              {currentAssignment.grade ? 'Graded' : 'Submitted'}
            </span>
          </div>
          
          <p className="text-gray-400 mb-4">{currentAssignment.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Course</span>
              <span className="text-white font-semibold">{currentAssignment.course}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Due Date</span>
              <span className="text-white font-semibold">{currentAssignment.dueDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Points</span>
              <span className="text-white font-semibold">{currentAssignment.points}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Your Submission:</h4>
            {currentAssignment.submittedFile && (
              <div className="flex flex-col mb-3">
                <span className="text-xs text-gray-400 mb-1">Submitted File</span>
                <span className="text-white font-semibold">{currentAssignment.submittedFile}</span>
              </div>
            )}
            {currentAssignment.submittedText && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 mb-1">Submitted Text</span>
                <div className="p-3 bg-gray-800 rounded-lg text-white whitespace-pre-wrap">
                  {currentAssignment.submittedText}
                </div>
              </div>
            )}
          </div>

          {currentAssignment.grade && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Feedback:</h4>
              <div className="p-4 bg-green-500/10 rounded-lg border-l-4 border-green-500">
                <div className="flex flex-col mb-2">
                  <span className="text-xs text-gray-400 mb-1">Grade</span>
                  <span className="text-white font-semibold">{currentAssignment.grade}/{currentAssignment.points}</span>
                </div>
                <p className="text-gray-300">{currentAssignment.feedback}</p>
              </div>
            </div>
          )}

          {!currentAssignment.grade && (
            <div className="p-4 bg-yellow-500/10 rounded-lg border-l-4 border-yellow-500 mb-6">
              <p className="text-gray-300">Your submission is under review. You will receive feedback once it's graded.</p>
            </div>
          )}

          <div className="flex gap-2">
            <button 
              className="bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold border border-gray-600 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
              onClick={() => setCurrentAssignment(null)}
            >
              <FaArrowLeft /> Back to Assignments
            </button>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">5</div>
                <div className="text-sm text-gray-400">Current Courses</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">12</div>
                <div className="text-sm text-gray-400">Completed Courses</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">87%</div>
                <div className="text-sm text-gray-400">Average Progress</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">15</div>
                <div className="text-sm text-gray-400">Certificates</div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-6 pb-3 border-b-2 border-orange-500/30">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.current.slice(0, 2).map(course => (
                <CourseCard key={course.id} course={course} showProgress />
              ))}
            </div>
          </>
        );

      case 'current-courses':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6 pb-3 border-b-2 border-orange-500/30">My Current Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.current.map(course => (
                <CourseCard key={course.id} course={course} showProgress />
              ))}
            </div>
          </>
        );

      case 'purchased-courses':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6 pb-3 border-b-2 border-orange-500/30">My Purchased Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.purchased.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        );

      case 'quizzes':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6 pb-3 border-b-2 border-orange-500/30">My Quizzes</h2>
            <div>
              {quizzes.map(quiz => (
                <QuizComponent key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </>
        );

      case 'assignments':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6 pb-3 border-b-2 border-orange-500/30">My Assignments</h2>
            <div>
              {assignments.map(assignment => (
                <AssignmentComponent key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </>
        );

      case 'progress':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6 pb-3 border-b-2 border-orange-500/30">My Learning Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">42</div>
                <div className="text-sm text-gray-400">Total Hours Learned</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">17</div>
                <div className="text-sm text-gray-400">Courses Enrolled</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">12</div>
                <div className="text-sm text-gray-400">Courses Completed</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-orange-500/20 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">92%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
          </>
        );

      case 'settings':
        return (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6 pb-3 border-b-2 border-orange-500/30">Account Settings</h2>
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">Profile Information</h3>
                <p className="text-gray-400 mb-4">Update your personal information and preferences</p>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <FaCog /> Edit Profile
                </button>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">Notification Settings</h3>
                <p className="text-gray-400 mb-4">Manage how you receive notifications</p>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <FaCog /> Configure
                </button>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-orange-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">Billing Information</h3>
                <p className="text-gray-400 mb-4">View your payment history and update billing details</p>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <FaCog /> View Billing
                </button>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 shadow-xl border-r border-orange-500/20">
        <div className="text-center p-5 border-b border-gray-700">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3 border-3 border-orange-500">
            AA
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-1">
            Ahmed Ali
          </h2>
          <p className="text-sm text-gray-400">ID: STU-2023-0456</p>
        </div>
        <ul className="mt-5">
          {navItems.map(item => (
            <li
              key={item.id}
              className={`flex items-center px-6 py-4 cursor-pointer transition-all ${
                activeSection === item.id 
                  ? 'bg-orange-500/20 border-l-4 border-orange-500' 
                  : 'border-l-4 border-transparent hover:bg-orange-500/10'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className={`mr-3 text-lg ${
                activeSection === item.id ? 'text-orange-500' : 'text-orange-500'
              }`} />
              <span className="font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-orange-500/20 w-80">
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            />
            <FaSearch className="text-gray-400" />
          </div>
        </div>

        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;