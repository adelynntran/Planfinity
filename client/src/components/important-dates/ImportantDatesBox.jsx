import React from 'react';
import Calendar from './Calendar';
import TodoListDiv from './TodoListDiv';

function ImportantDateBox() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px 20px',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: '#fafafa'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          textAlign: 'center'
        }}>
          Important Dates
        </h3>
      </div>

      {/* Upper half: Calendar Section */}
      <div style={{
        padding: '12px',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: '#fafafa'
      }}>
        <Calendar />
      </div>

      {/* Lower half: Todo List Section */}
      <div style={{
        flex: 1,
        minHeight: '200px', // Ensure minimum height for todo list
        display: 'flex',
        flexDirection: 'column'
      }}>
        <TodoListDiv />
      </div>
    </div>
  );
}

export default ImportantDateBox;