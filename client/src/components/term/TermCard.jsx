
//go up 2 levels (components -> src)
//so this means from component/ -> src/ -> context
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

//import components here:
import IndividualCourse from '../course/IndividualCourse';
import AddCourseDialog from '../course/AddCourseDialog';

function TermCard({ termName }) {
  const { getCoursesForTerm, 
    getTermCredits, 
    addCourseToTerm, 
    updateCourseGrade,
    addCourseToCatalog,
    removeTermFromDegree,
    addTermToPlan,
    state } = useApp();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTermMenu, setShowTermMenu] = useState(false);
  
  const courses = getCoursesForTerm(termName);
  const totalCredits = getTermCredits(termName);

  //handling adding courses:
  const handleAddCourse = (courseData, grade) => {
    // First, add the course to courses array
    console.log('Adding course:', courseData, 'with grade:', grade);
    // add the course to courses catalog
  addCourseToCatalog(courseData);
    // Then add it to the term
    addCourseToTerm(courseData.id, termName);
    
    // If there's a grade, update it
    if (grade) {
      updateCourseGrade(courseData.id, grade);
    }
  };

  const handleRemoveTerm = () => {
    if (window.confirm(`Are you sure you want to remove ${termName} from your degree plan?`)) {
      removeTermFromDegree(termName);
    }
  };

  const handleAddToPlan = () => {
    const termData = {
      courses: courses,
      credits: totalCredits
    };
    addTermToPlan(termName, termData);
    alert('Feature coming soon: Add term to new plan!');
  };
  
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      height: '400px', // ← Fixed height for consistency
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Header with dropdown menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#1f2937', marginTop: '0', marginBottom: '8px' }}>{termName}</h3>
        
        {/* Three dots menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowTermMenu(!showTermMenu)}
            style={{
              background: 'blue',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            ⋯
          </button>
          
          {/* Dropdown menu */}
          {showTermMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 10,
              minWidth: '160px'
            }}>
              <button
                onClick={() => {
                  handleAddToPlan();
                  setShowTermMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'black'
                }}
              >
                Add to New Plan
              </button>
              <button
                onClick={() => {
                  handleRemoveTerm();
                  setShowTermMenu(false);
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#dc3545'
                }}
              >
                Remove Term
              </button>
            </div>
          )}
        </div>
      </div>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>Credits: {totalCredits}</p>
      
      {/* Scrollable courses container */}
      <div style={{
        flex: 1, // Takes up remaining space
        overflowY: 'auto', // Makes it scrollable
        marginBottom: '12px',
        paddingRight: '4px' // Space for scrollbar
      }}>
        {courses.length === 0 ? (
          <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No courses planned</p>
        ) : (
          courses.map(course => (
            <IndividualCourse
              key={course.id}
              courseId={course.id}
              termName={termName}
            />
          ))
        )}
      </div>
  
      {/* Add Course Button - stays at bottom */}
      <button
        style={{
          background: '#10b981',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          marginTop: 'auto' // Pushes to bottom
        }}
        onClick={() => setShowAddDialog(true)}
      >
        Add Course
      </button>
  
      <AddCourseDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAddCourse={handleAddCourse}
        termName={termName}
      />
    </div>
  );
}

export default TermCard;