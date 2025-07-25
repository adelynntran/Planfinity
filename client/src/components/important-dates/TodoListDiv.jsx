import { useApp } from '../../context/AppContext';
import { useState } from 'react';
//import components here:
import TodoCheckLine from './TodoCheckLine';

function TodoListDiv() {
//declare hooks here:
  const { state } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  
//declare variables here:
  const todos = state.importantDates;
  const todoCount = todos.length;

//declare utilise functions here:
  const handleAddTodo = () => {
    setShowAddDialog(true);
    console.log('Opening add todo dialog');
    // Dialog functionality coming later
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Header with count and add button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        flexShrink: 0
      }}>
        <h4 style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151'
        }}>
          {todoCount} Deadline & Quiz Date
        </h4>
        <button
          onClick={handleAddTodo}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#10b981',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#059669';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#10b981';
            e.target.style.transform = 'scale(1)';
          }}
          title="Add new todo"
        >
          +
        </button>
      </div>

      {/* Scrollable todo list body */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '8px 12px',
        maxHeight: '300px', // Limit height for scrolling
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9'
      }}>
        {todos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontStyle: 'italic',
            fontSize: '14px',
            padding: '24px 16px'
          }}>
            No deadlines yet. Click + to add one!
          </div>
        ) : (
          todos.map(todo => (
            <TodoCheckLine 
              key={todo.id}
              todo={todo}
            />
          ))
        )}
      </div>

      {/* Placeholder for future add dialog */}
      {showAddDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            minWidth: '300px'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Add New Todo</h3>
            <p style={{ margin: '0 0 16px 0', color: '#666' }}>
              Dialog coming soon! 🚀
            </p>
            <button
              onClick={() => setShowAddDialog(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoListDiv;