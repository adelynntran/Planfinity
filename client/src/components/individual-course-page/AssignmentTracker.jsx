import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

//import components here:
import AssignmentRow from './AssignmentRow';

function AssignmentTracker() {
  const { courseId } = useParams();
  //declare needed context values here:
  const { 
    getCourseAssignments, 
    calculateCourseGPA, 
    calculateRequiredGrade,
    addAssignment 
  } = useApp();
  
  const assignments = getCourseAssignments(courseId);
  const currentGrade = calculateCourseGPA(courseId) || 0;
  
  const [targetGrade, setTargetGrade] = useState(85);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    name: '',
    weight: '',
    grade: '',
    completed: false
  });

  // Calculate required grade for incomplete assignments using helper func from AppContext
  const requiredGrade = calculateRequiredGrade(courseId, targetGrade);

  const handleAddAssignment = () => {
    if (newAssignment.name && newAssignment.weight) {
      addAssignment(courseId, {
        name: newAssignment.name,
        weight: parseFloat(newAssignment.weight) / 100, // Convert percentage to decimal
        grade: newAssignment.grade ? parseFloat(newAssignment.grade) : null,
        completed: Boolean(newAssignment.grade)
      });
      
      // Reset form
      setNewAssignment({ name: '', weight: '', grade: '', completed: false });
      setShowAddForm(false);
    }
  };

  return (
    <div style={{ 
      border: '2px solid #ff6b35', 
      borderRadius: '8px', 
      padding: '20px', 
      margin: '20px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ 
        color: '#333', 
        marginBottom: '20px',
        borderBottom: '2px solid #333',
        paddingBottom: '10px'
      }}>
        GPA Calculator
      </h3>

      {/* Assignment Table */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 1fr', 
          gap: '10px',
          fontWeight: 'bold',
          padding: '10px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '10px',
          color: 'black'
        }}>
          <div>Assignment Name</div>
          <div>Weight</div>
          <div>Grade</div>
        </div>

        {assignments.map(assignment => (
          <AssignmentRow 
            key={assignment.id}
            assignment={assignment}
            courseId={courseId}
            requiredGrade={!assignment.completed ? requiredGrade : null}
          />
        ))}

        {/* Add Assignment Form */}
        {showAddForm && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr 1fr', 
            gap: '10px',
            padding: '10px',
            backgroundColor: '#fff3cd',
            borderRadius: '4px',
            border: '1px solid #ffeaa7'
          }}>
            <input
              type="text"
              placeholder="Assignment name"
              value={newAssignment.name}
              onChange={(e) => setNewAssignment({...newAssignment, name: e.target.value})}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Weight %"
              value={newAssignment.weight}
              onChange={(e) => setNewAssignment({...newAssignment, weight: e.target.value})}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Grade (optional)"
              value={newAssignment.grade}
              onChange={(e) => setNewAssignment({...newAssignment, grade: e.target.value})}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )}

        {/* Add Assignment Buttons */}
        <div style={{ marginTop: '10px' }}>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + Add Assignment
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleAddAssignment}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewAssignment({ name: '', weight: '', grade: '', completed: false });
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Current Grade and Target Grade */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #ccc'
      }}>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          padding: '10px 20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '2px solid #2196f3',
          color: 'black'
        }}>
          Current Grade: <span style={{ color: '#1976d2' }}>{currentGrade.toFixed(1)}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold' }}>Target Grade:</label>
          <input
            type="number"
            value={targetGrade}
            onChange={(e) => setTargetGrade(parseFloat(e.target.value) || 0)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '2px solid #ff6b35',
              width: '80px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          />
        </div>
      </div>

      {/* Show required grade info */}
      {requiredGrade && !isNaN(requiredGrade) && (
        <div style={{ 
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          border: '1px solid #ffeaa7',
          color: 'black'
        }}>
          <strong>To reach your target grade of {targetGrade}%, you need an average of {requiredGrade.toFixed(1)}% on remaining assignments.</strong>
        </div>
      )}
    </div>
  );
}

export default AssignmentTracker;