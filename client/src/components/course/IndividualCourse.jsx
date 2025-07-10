import { useApp } from '../../context/AppContext';

function IndividualCourse({ courseId, termName }) {
  const { getCourse, removeCourseFromTerm, state } = useApp();
  const course = getCourse(courseId);
  
  const handleCourseClick = () => {
    // Navigate to course page (notes: add React Router later)
    console.log(`Navigate to ${course.code} page`);
  };
  
  return (
    <div style={{ 
      margin: '12px 0', 
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
      border: '1px solid #f3f4f6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      cursor: 'pointer'
    }}
    onClick={handleCourseClick}  // Click to navigate
    >
      <div style={{ flex: 1 }}>
        <strong style={{ color: '#111827', fontSize: '14px' }}>{course.code}</strong>
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
            console.log(`${course.id} is removed from ${termName}`)
            removeCourseFromTerm(course.id, termName);
          }}
          title="Remove course"
        >
            <strong>-</strong>
        </button>
      </div>
    </div>
  );
}

export default IndividualCourse;