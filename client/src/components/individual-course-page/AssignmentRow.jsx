import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import WarningBox from '../common/WarningBox';

function AssignmentRow({ assignment, courseId, requiredGrade }) {
  
  //declare necessary functions, hooks here:
  const { updateAssignment, removeAssignment } = useApp();
  const [showWarning, setShowWarning] = useState(false);
  //boolean state to track if this row is in "edit mode" or "display mode":
  //true: show "input" fields, false: show regular text
  const [isEditing, setIsEditing] = useState(false);
  //store the temp values while user is editing (name, weight, grade)
  //to separate from the actual values til user clicks save:
  const [editValues, setEditValues] = useState({
    name: assignment.name,
    weight: (assignment.weight * 100).toString(), // Show as percentage to user
    grade: assignment.grade?.toString() || ''
  });

  //declare event handlers here:

  //when user clicks save button: creates an "updates" object with new values
  //calls the context helper func (from AppContext) to update the assignment
  //then exits edit mode
  const handleSave = () => {
    const updates = {
      name: editValues.name,
      weight: parseFloat(editValues.weight) / 100, // Convert user's percentage input to decimal
      grade: editValues.grade ? parseFloat(editValues.grade) : null,
      completed: Boolean(editValues.grade)
    };
    
    //call helper func from AppContext to update with new values in "updates" object
    updateAssignment(courseId, assignment.id, updates);

    //exits edit mode:
    setIsEditing(false);
  };

  //when user clicks cancel: resets "editValues" back to original data
  //(ie. discarding changes) -> exits edit mode:
  const handleCancel = () => {
    setEditValues({
      name: assignment.name,
      weight: (assignment.weight * 100).toString(), // Show as percentage to user
      grade: assignment.grade?.toString() || ''
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log(`Deleting assignment ${assignment.id} from course ${courseId}`);
    setShowWarning(false);
    
    // TODO: Uncomment when you add removeAssignment to AppContext
    // removeAssignment(courseId, assignment.id);
  };

  const displayGrade = () => {
    if (assignment.completed && assignment.grade !== null) {
      return `${assignment.grade}/100`;
    } else if (!assignment.completed && requiredGrade && !isNaN(requiredGrade)) {
      return `Need: ${requiredGrade.toFixed(1)}/100`;
    } else {
      return 'Not completed';
    }
  };

  const getGradeStyle = () => {
    if (assignment.completed) {
      return { color: '#28a745', fontWeight: 'bold' }; // Green for completed
    } else if (requiredGrade) {
      return { color: '#fd7e14', fontWeight: 'bold', fontStyle: 'italic' }; // Orange for required
    }
    return { color: '#6c757d' }; // Gray for not completed
  };

  if (isEditing) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr 1fr 60px', // Added 4th column for delete button
        gap: '10px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        border: '1px solid #ffeaa7',
        marginBottom: '5px'
      }}>
        <input
          type="text"
          value={editValues.name}
          onChange={(e) => setEditValues({...editValues, name: e.target.value})}
          style={{ 
            padding: '6px', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <input
          type="number"
          value={editValues.weight}
          onChange={(e) => setEditValues({...editValues, weight: e.target.value})}
          style={{ 
            padding: '6px', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
          placeholder="Weight %"
        />
        <input
          type="number"
          value={editValues.grade}
          onChange={(e) => setEditValues({...editValues, grade: e.target.value})}
          style={{ 
            padding: '6px', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
          placeholder="Grade"
        />
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '4px 6px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: '4px 6px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            ✗
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 1fr 60px', // Added 4th column for delete button
          gap: '10px',
          padding: '10px',
          backgroundColor: assignment.completed ? '#f8f9fa' : '#fff',
          borderRadius: '4px',
          border: '1px solid #dee2e6',
          marginBottom: '5px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => setIsEditing(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e9ecef';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = assignment.completed ? '#f8f9fa' : '#fff';
        }}
      >
        <div style={{ 
          fontSize: '14px',
          fontWeight: assignment.completed ? 'normal' : 'bold',
          color: 'black'
        }}>
          {assignment.name}
        </div>
        
        <div style={{ 
          fontSize: '14px',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#495057'
        }}>
          {(assignment.weight * 100).toFixed(0)}%
        </div>
        
        <div style={{ 
          fontSize: '14px',
          textAlign: 'center',
          ...getGradeStyle()
        }}>
          {displayGrade()}
        </div>

        {/* remove assignment button */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
              e.stopPropagation(); // Prevent assignment click when deleting
              console.log(`Showing warning`);
              setShowWarning(true);
            }}
            title="Remove assignment"
          >
            <strong>×</strong>
          </button>
        </div>
      </div>

      {/*WarningBox component*/}
            <WarningBox
            title="Remove Assignment"
            message={`Are you sure you want to remove ${assignment.name} from ${courseId}?`}
            open={showWarning}
      
            //confirm to delete the course:
            onConfirm={() => {
              //actually delete the course (confirm to delete)
              removeAssignment(courseId, assignment.id);
              setShowWarning(false); //close WarningBox dialog
            }}
      
            //do not want to delete the course:
            onCancel={() => {
              setShowWarning(false); //just close WarningBox dialog, no further action
            }}
            >
      
            </WarningBox>
         
        
      
    </>
  );
}

export default AssignmentRow;