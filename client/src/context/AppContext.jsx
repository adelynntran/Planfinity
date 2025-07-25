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

  // Individual course assignments
  courseAssignments: {
    'EECS2030' : [
      {id: 1, name: 'Assignments', weight: 0.1, grade: 100, completed: true},
      {id: 2, name: 'Written 1', weight: 0.1, grade: 92, completed: true},
      {id: 3, name: 'Written 2', weight: 0.1, grade: 46, completed: true},
      {id: 4, name: 'Prog Test', weight: 0.15, grade: null, completed: false},
      {id: 5, name: 'Final', weight: 0.55, grade: null, completed: false}
    ]
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
      
      //update the exisiting assignment:
      case 'UPDATE_ASSIGNMENT':
        return {
          ...state,
          courseAssignments: {
            ...state.courseAssignments,
            [action.courseId]: state.courseAssignments[action.courseId].map(assignment =>
              assignment.id === action.assignmentId
              ? {...assignment, ...action.updates}
              : assignment
            )
          }
        };

        //add new, non-existing assignment:
        case 'ADD_ASSIGNMENT':
          return {
            //copy all existing state
            ...state,
            courseAssignments: {
            
              ...state.courseAssignments, //keep all other courses assignments
              //update specific course' assignments
              [action.courseId]: [ //based on courseId, eg for 'EECS2030' specifically
                ...(state.courseAssignments[action.courseId] || []), //keep existing assignments
                // || []: safety check, if the course doesnt have any assignments yet, use an
                //empty array instead of undefined
                {
                  id: Date.now(), //make a unique ID for it
                  ...action.assignmentData //add the new assignment data
                }
              ]
            }
          };

          case 'REMOVE_ASSIGNMENT':
            return {
              ...state,
              courseAssignments: {
                ...state.courseAssignments,
                [action.courseId]: state.courseAssignments[action.courseId].filter(assignment => assignment.id != action.assignmentId)
              }
            };

    case 'ADD_IMPORTANT_DATE':
      return {
        ...state,
        importantDates: [
          ...state.importantDates,
          {
            ...action.dateData,
            id: Date.now()} //creating unique id (date+exact time its created)
        ]
      };

    case 'REMOVE_TERM_FROM_DEGREE':
      const { [action.termName]: removedTerm, ...remainingTerms } = state.currentPlan.terms;
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          terms: remainingTerms
        }
      };

    case 'ADD_TERM_TO_DEGREE':
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          terms: {
            ...state.currentPlan.terms,
            [action.termName]: []
          }
        }
      };

    case 'ADD_TERM_TO_PLAN':
      // Placeholder for now
      console.log('Adding term to new plan:', action.termName, action.termData);
      return state;

    case 'REMOVE_IMPORTANT_DATE':
      return {
        ...state,
        importantDates: state.importantDates.filter(date => date.id !== action.dateId)
      };

    case 'TOGGLE_DATE_COMPLETION':
        return {
          ...state,
          importantDates: state.importantDates
            .map(date => 
              date.id === action.dateId
                ? { ...date, completed: !date.completed }
                : date
            )
            .sort((a, b) => {
              // Completed items go to end, then sort by date
              if (a.completed && !b.completed) return 1;
              if (!a.completed && b.completed) return -1;
              return new Date(a.date) - new Date(b.date);
            }) 
        };

    case 'ADD_COURSE_TO_CATALOG':
      return {
          ...state,
          courses: [...state.courses, action.courseData]
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

  //add new course to catalog:
  const addCourseToCatalog = (courseData) => {
    dispatch({ type: 'ADD_COURSE_TO_CATALOG', courseData });
  };

  const updateCourseGrade = (courseId, grade) => {
    dispatch({ type: 'UPDATE_COURSE_GRADE', courseId, grade });
  };

  //update assignment grade or weight:
  const updateAssignment = (courseId, assignmentId, updates) => {
    dispatch({type: 'UPDATE_ASSIGNMENT', courseId, assignmentId, updates});
  };

  //add new assignment:
  const addAssignment = (courseId, assignmentData) => {
    dispatch({type: 'ADD_ASSIGNMENT', courseId, assignmentData});
  };

  //remove current assignment:
  const removeAssignment = (courseId, assignmentId) => {
    dispatch({type: 'REMOVE_ASSIGNMENT', courseId, assignmentId});
  }

  //get assignments for a specific course:
  const getCourseAssignments = (courseId) => {
    return state.courseAssignments[courseId] || [];
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

  const removeTermFromDegree = (termName) => {
    dispatch({ type: 'REMOVE_TERM_FROM_DEGREE', termName });
  };
  
  const addTermToDegree = (termName) => {
    dispatch({ type: 'ADD_TERM_TO_DEGREE', termName });
  };
  
  const addTermToPlan = (termName, termData) => {
    dispatch({ type: 'ADD_TERM_TO_PLAN', termName, termData });
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
      // Find the GPA from gradePercentRange
      const gradeInfo = gradePercentRange.find(grade => grade.letter === letterGrade);
      
      if (course && gradeInfo) {
        totalPoints += gradeInfo.gpa * course.credits;
        totalCredits += course.credits;
      }
    });
  
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    return { gpa, letter: 'Coming soon' }; //add letter calculation later
  };
  
  //individual course GPA calculator:
  const calculateCourseGPA = (courseId) => {
      const assignments = state.courseAssignments[courseId] || [];
      const completed = assignments.filter(a => a.completed);
      return completed.reduce((sum,a) => sum + a.grade, 0) / completed.length;
  };

  //required grade for target gpa (e.g. assignment 1 need 66/100 to get 70 course gpa)
  const calculateRequiredGrade = (courseId, targetGPA) => {
    const assignments = state.courseAssignments[courseId] || [];
    const completed = assignments.filter(a => a.completed);
    const incomplete = assignments.filter(a => !a.completed);

    //equation to find the required grade (x) of incompleted assignments:
    //completed_sum + x * incomplete_weight_sum = target
    const completedSum = completed.reduce((sum,a) => sum + (a.grade * a.weight),0);
    const incompleteWeightSum = incomplete.reduce((sum,a) => sum + a.weight,0);

    return (targetGPA - completedSum) / incompleteWeightSum;
  }

  //helper: convert from scale 100 to letter grade:
  const convertToLetterGrade = (percentage) => {
    return gradePercentRange.find(grade =>
      percentage >= grade.min && percentage <= grade.max
    );
  }
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
    calculateRequiredGrade,
    convertToLetterGrade,
    updateAssignment,
    addAssignment,
    removeAssignment,
    getCourseAssignments,
    getCourse,
    getCoursesForTerm,
    addCourseToCatalog,
    removeTermFromDegree,
    addTermToDegree,
    addTermToPlan,
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