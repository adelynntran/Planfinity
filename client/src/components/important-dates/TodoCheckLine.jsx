import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

function TodoCheckLine({ todo }) {
  //declare hooks here:
  const { toggleDateCompletion } = useApp();
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);

  //declare functions here:
  const formatDateForDisplay = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    }); // returns "July 5"
  };

  const handleCheckboxClick = () => {
    toggleDateCompletion(todo.id);
  };

  const handleNotesToggle = () => {
    setIsNotesExpanded(!isNotesExpanded);
  };
  
  return (
    <div>
      {/* Main todo line */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '8px 0'
      }}>
        {/* Left: Checkbox */}
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleCheckboxClick}
            style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%', // Makes it round!
                border: '2px solid #d1d5db',
                backgroundColor: todo.completed ? '#10b981' : 'white',
                cursor: 'pointer',
                appearance: 'none', // Remove default styling
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s ease'
            }}
        />

                {todo.completed && (
                <span style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginLeft: '-18px', // Position over checkbox
                    pointerEvents: 'none'
                }}>
                    ✓
                </span>
                )}

        {/* Middle: Date + Title */}
        <div style={{ flex: 1, marginLeft: '12px' }}>
          <span style={{ color: '#666' }}>
            {formatDateForDisplay(todo.date)} - 
          </span>
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#999' : '#333'
          }}>
            {todo.title}
          </span>
        </div>

        {/* Right: Notes icon (only if notes exist) */}
        {todo.notes && (
          <button
            onClick={handleNotesToggle}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            📝
          </button>
        )}
      </div>

      {/* Expanded notes line */}
      {isNotesExpanded && todo.notes && (
        <div style={{ 
          marginLeft: '32px', // Indent under the main line
          color: '#666',
          fontSize: '14px',
          fontStyle: 'italic',
          padding: '4px 0'
        }}>
          📝 {todo.notes}
        </div>
      )}
    </div>
  );
}

export default TodoCheckLine;