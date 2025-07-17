import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

//import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//import components here:
import AssignmentTracker from '../components/individual-course-page/AssignmentTracker';

function IndividualCoursePage() {
    const navigate = useNavigate();
  const { courseId } = useParams(); // Get courseId from URL
  const { getCourse } = useApp();
  const course = getCourse(courseId);

  //state for note section:
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  //navigate back to HomePage:
  const handleBackToHomeClick = () => {
    navigate('/');
    console.log(`Navigating from ${course.id} back to HomePage`);
};

  if (!course) {
    return <div>Course not found!</div>;
  }

  return (
  <div style={{ width: '100%', margin: 0, padding: 0 }}>
    <div style={{ padding: '20px' }}>
      <p><strong>Credits:</strong> {course.credits}</p>
      <p><strong>Category:</strong> {course.category}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Prerequisites:</strong> {course.prerequisites.join(', ') || 'None'}</p>

    {/* Notes Section */}
    <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h4 style={{ margin: 0, color: '#333' }}>Notes</h4>
            <button
              onClick={() => setIsEditingNotes(!isEditingNotes)}
              style={{
                padding: '5px 10px',
                backgroundColor: isEditingNotes ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {isEditingNotes ? 'Cancel' : 'Edit'}
            </button>
          </div>
          
          {isEditingNotes ? (
            <div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes here..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={() => setIsEditingNotes(false)}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save Notes
              </button>
            </div>
          ) : (
            <div style={{ 
              minHeight: '50px',
              padding: '10px',
              backgroundColor: 'white',
              border: '1px solid #e9ecef',
              borderRadius: '4px',
              fontSize: '14px',
              color: notes ? '#333' : '#6c757d',
              fontStyle: notes ? 'normal' : 'italic'
            }}>
              {notes || 'Click Edit to add notes...'}
            </div>
          )}
        </div>
      </div>
    
    <AssignmentTracker />
    
    <div style={{ padding: '20px' }}>
      {/*Back to HomePage Button */}
      <Button
        onClick={handleBackToHomeClick}
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '14px',
          textTransform: 'none',
          marginTop: '30px',
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            backgroundColor: '#1565c0',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
            transform: 'translateY(-1px)'
          },
          transition: 'all 0.2s ease-in-out'
        }}
      >
        ← Back to Home
      </Button>
    </div>
  </div>
  );
}

export default IndividualCoursePage;