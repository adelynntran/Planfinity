
//go up 2 levels (components -> src)
//so this means from component/ -> src/ -> context
import { useApp } from '../../context/AppContext';

//import components here:
import IndividualCourse from '../course/IndividualCourse';

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

        //IndividualCourse component in use:
        courses.map(course => (
          <IndividualCourse 
            key={course.id} 
            courseId={course.id} 
            termName={termName} 
          />
        ))
      )}
      
      {/* Add Course Button */}
      <div style={{ marginTop: '10px', borderTop: '1px solid #e5e7eb', paddingTop: '10px' }}>
        <button 
          style={{ 
            background: '#10b981', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => console.log(`Add course to ${termName}`)}
        >
          Add Course
        </button>
      </div>
    </div>
  );
}

export default TermCard;