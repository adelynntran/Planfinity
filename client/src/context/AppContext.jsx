// src/context/AppContext.jsx
//Usage: "data bucket" file aka context provider (like a data warehouse)
import { createContext, useContext, useReducer, useEffect } from 'react';
import { mockCourses, initialTerms, mockImportantDates, gradePercentRange } from '../data/mockCourses';

// Create the context

/* 
creating the AppContext "data bucket" with createContext() function
to store all of the data that other components can grab and use
(avoiding prop drilling from passing down the component tree)
 */
const AppContext = createContext();

// Initial state
const initialState = {
  // Course data
  courses: mockCourses,
  
  // Current degree plan
  currentPlan: {
    id: 'main-plan',
    name: 'Computer Science Honours',
    terms: { ...initialTerms }
  },
  
  // Course grades
  courseGrades: {
    // Example grades
    'EECS2030': 'A',
    'MATH2030': 'A+',
    'EECS2021': 'B'
  },
  
  // Important dates
  importantDates: mockImportantDates,
  
  // UI state
  loading: false,
  error: null
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_COURSE_TO_TERM':
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          terms: {
            ...state.currentPlan.terms,
            [action.term]: [...state.currentPlan.terms[action.term], action.courseId]
          }
        }
      };

    case 'REMOVE_COURSE_FROM_TERM':
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          terms: {
            ...state.currentPlan.terms,
            [action.term]: state.currentPlan.terms[action.term].filter(id => id !== action.courseId)
          }
        }
      };

    case 'UPDATE_COURSE_GRADE':
      return {
        ...state,
        courseGrades: {
          ...state.courseGrades,
          [action.courseId]: action.grade
        }
      };

    case 'ADD_IMPORTANT_DATE':
      return {
        ...state,
        importantDates: [
          ...state.importantDates,
          {
            ...action.dateData,
            id: Date.now() // Simple ID generation
          }
        ]
      };

    case 'REMOVE_IMPORTANT_DATE':
      return {
        ...state,
        importantDates: state.importantDates.filter(date => date.id !== action.dateId)
      };

    case 'TOGGLE_DATE_COMPLETION':
      return {
        ...state,
        importantDates: state.importantDates.map(date =>
          date.id === action.dateId
            ? { ...date, completed: !date.completed }
            : date
        )
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      };

    case 'LOAD_DATA':
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on startup
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('planfinity-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', data: parsedData });
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('planfinity-data', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [state]);

  // Helper functions
  const addCourseToTerm = (courseId, term) => {
    dispatch({ type: 'ADD_COURSE_TO_TERM', courseId, term });
  };

  const removeCourseFromTerm = (courseId, term) => {
    dispatch({ type: 'REMOVE_COURSE_FROM_TERM', courseId, term });
  };

  const updateCourseGrade = (courseId, grade) => {
    dispatch({ type: 'UPDATE_COURSE_GRADE', courseId, grade });
  };

  const addImportantDate = (dateData) => {
    dispatch({ type: 'ADD_IMPORTANT_DATE', dateData });
  };

  const removeImportantDate = (dateId) => {
    dispatch({ type: 'REMOVE_IMPORTANT_DATE', dateId });
  };

  const toggleDateCompletion = (dateId) => {
    dispatch({ type: 'TOGGLE_DATE_COMPLETION', dateId });
  };

  // Calculate GPA
  /*
  1. find the GPA from gradePercentRange array.
  2. Look for the object where "letter" matches the grade
  3. use that object's gpa value
  p/s: use .find() to search through thr array for the matching letter grade
   */

  //cGPA calculator 
  const calculateCumulativeGPA = () => {
    const gradedCourses = Object.entries(state.courseGrades);
    if (gradedCourses.length === 0) return { gpa: 0, letter: 'N/A' };
  
    let totalPoints = 0;
    let totalCredits = 0;
  
    gradedCourses.forEach(([courseId, letterGrade]) => {
      const course = getCourse(courseId);
      // Find the GPA from your gradePercentRange
      const gradeInfo = gradePercentRange.find(grade => grade.letter === letterGrade);
      
      if (course && gradeInfo) {
        totalPoints += gradeInfo.gpa * course.credits;
        totalCredits += course.credits;
      }
    });
  
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    return { gpa, letter: 'Coming soon' }; // We'll add letter calculation later
  };
  
  //individual course GPA calculator:
  const calculateCourseGPA = (courseId) => {
      return(85);
  };
  // Get course by ID
  const getCourse = (courseId) => {
    return state.courses.find(course => course.id === courseId);
  };

  // Get courses for a specific term
  const getCoursesForTerm = (term) => {
    return state.currentPlan.terms[term]?.map(courseId => getCourse(courseId)).filter(Boolean) || [];
  };

  // Calculate total credits for a term
  const getTermCredits = (term) => {
    const courses = getCoursesForTerm(term);
    return courses.reduce((total, course) => total + course.credits, 0);
  };

  // Calculate total credits for the whole degree
  const getDegreeCredits = () => {
    let totalCredits = 0;
    Object.keys(state.currentPlan.terms).forEach(termName => {
      totalCredits += getTermCredits(termName);
    });
    return totalCredits;

  }

  // Context value
  const value = {
    state,
    dispatch,
    // Helper functions
    addCourseToTerm,
    removeCourseFromTerm,
    updateCourseGrade,
    addImportantDate,
    removeImportantDate,
    toggleDateCompletion,
    calculateCumulativeGPA,
    calculateCourseGPA,
    getCourse,
    getCoursesForTerm,
    getTermCredits,
    getDegreeCredits
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;