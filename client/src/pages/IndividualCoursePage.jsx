import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';

//import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function IndividualCoursePage() {
    const navigate = useNavigate();
  const { courseId } = useParams(); // Get courseId from URL
  const { getCourse } = useApp();
  const course = getCourse(courseId);

  //navigate back to HomePage:
  const handleBackToHomeClick = () => {
    navigate('/');
    console.log(`Navigating from ${course.id} back to HomePage`);
};

  if (!course) {
    return <div>Course not found!</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{course.code} - {course.name}</h1>
      <p><strong>Credits:</strong> {course.credits}</p>
      <p><strong>Category:</strong> {course.category}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Prerequisites:</strong> {course.prerequisites.join(', ') || 'None'}</p>
      
      <h2>Coming Soon:</h2>
      <ul>
        <li>Assignment Tracker</li>
        <li>Grade Calculator</li>
        <li>Course Notes</li>
      </ul>

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
  );
}

export default IndividualCoursePage;