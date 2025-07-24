import { useApp } from '../../context/AppContext';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//import components here:
import WarningBox from '../../components/common/WarningBox';

function IndividualCourse({ courseId, termName }) {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const { getCourse, removeCourseFromTerm, state } = useApp();
  const course = getCourse(courseId);
  
  const handleCourseClick = () => {
    // Navigate to course page (notes: add React Router later)
    navigate(`/course/${course.id}`);
    console.log(`Navigating to ${course.id} page`);
  };
  
  return (
    <div 
      id={`course-${course.id}`} // ← Added ID for scrolling
      style={{
        margin: '12px 0',
        padding: '12px',
        backgroundColor: window.highlightedCourse === course.id ? '#fff3cd' : '#f9fafb', // ← Highlighting background
        borderRadius: '6px',
        border: window.highlightedCourse === course.id ? '2px solid #ffc107' : '1px solid #f3f4f6', // ← Highlighting border
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        transition: 'all 0.3s ease', // ← Smooth transition
        boxShadow: window.highlightedCourse === course.id ? '0 0 20px rgba(255, 193, 7, 0.3)' : 'none' // ← Glow effect
      }}
    >
      <div style={{ flex: 1 }}>
        {/*CourseCode button to nav to IndividualCoursePage.jsx */}
        <button
          onClick={handleCourseClick}
          style={{
            background: 'none',
            border: 'none',
            color: '#1976d2',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: 0
          }}
        >
          {course.code}
        </button>
        <div style={{ color: '#374151', fontSize: '13px', marginTop: '2px' }}>{course.name}</div>
        <small style={{ color: '#6b7280', fontSize: '11px' }}>
          {course.credits} credits • Grade: {state.courseGrades[course.id] || 'Not graded'}
        </small>
      </div>
      
      {/* remove term button */}
      <div style={{ position: 'relative' }}>
        <button
          style={{
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            border: 'none',
            backgroundColor: '#ef4444',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent course click when deleting
            console.log(`Showing warning for ${course.id} in ${termName}`);
            setShowWarning(true);
          }}
          title="Remove course"
        >
          <strong>-</strong>
        </button>
      </div>

      {/*WarningBox component*/}
      <WarningBox
        title="Remove Course"
        message={`Are you sure you want to remove ${course.code} from ${termName}?`}
        open={showWarning}

        //confirm to delete the course:
        onConfirm={() => {
          //actually delete the course (confirm to delete)
          removeCourseFromTerm(course.id,termName);
          setShowWarning(false); //close WarningBox dialog
        }}

        //do not want to delete the course:
        onCancel={() => {
          setShowWarning(false); //just close WarningBox dialog, no further action
        }}
      >
      </WarningBox>
    </div>
  );
}

export default IndividualCourse;