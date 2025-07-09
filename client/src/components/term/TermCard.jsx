
//go up 2 levels (components -> src)
//so this means from component/ -> src/ -> context
import { useApp } from '../../context/AppContext';

function TermCard({ termName }) {
  const { getCoursesForTerm, getTermCredits, state } = useApp();
  
  const courses = getCoursesForTerm(termName);
  const totalCredits = getTermCredits(termName);
  
  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px',
      padding: '16px', 
      margin: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#1f2937', marginTop: '0', marginBottom: '8px' }}>{termName}</h3>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>Credits: {totalCredits}</p>
      
      {courses.length === 0 ? (
        <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No courses planned</p>
      ) : (
        courses.map(course => (
          <div key={course.id} style={{ 
            margin: '12px 0', 
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            border: '1px solid #f3f4f6'
          }}>
            <strong style={{ color: '#111827', fontSize: '14px' }}>{course.code}</strong>
            <span style={{ color: '#374151', marginLeft: '8px' }}>- {course.name}</span>
            <br />
            <small style={{ color: '#6b7280', fontSize: '12px' }}>
              {course.credits} credits | Grade: {state.courseGrades[course.id] || 'Not graded'}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default TermCard;