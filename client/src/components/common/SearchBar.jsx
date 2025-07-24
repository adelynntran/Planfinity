import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

function CourseSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedCourse, setHighlightedCourse] = useState(null);
  const [showAddTerm, setShowAddTerm] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('');
  
  const { state, addCourseToTerm, updateCourseGrade } = useApp();
  const terms = Object.keys(state.currentPlan.terms);

  // Function to find course in all terms
  const findCourseInTerms = (query) => {
    if (!query.trim()) return null;
    
    const cleanQuery = query.toLowerCase().replace(/\s+/g, '');
    
    for (const [termName, courseIds] of Object.entries(state.currentPlan.terms)) {
      for (const courseId of courseIds) {
        const course = state.courses.find(c => c.id === courseId);
        if (course && (
          course.code.toLowerCase().replace(/\s+/g, '').includes(cleanQuery) ||
          course.name.toLowerCase().includes(cleanQuery)
        )) {
          return { course, termName, courseId };
        }
      }
    }
    return null;
  };

  // Function to check if course exists in catalog but not in any term
  const findCourseInCatalog = (query) => {
    if (!query.trim()) return null;
    
    const cleanQuery = query.toLowerCase().replace(/\s+/g, '');
    
    return state.courses.find(course => 
      course.code.toLowerCase().replace(/\s+/g, '').includes(cleanQuery) ||
      course.name.toLowerCase().includes(cleanQuery)
    );
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // First, try to find in terms (highlight if found)
    const foundInTerms = findCourseInTerms(searchQuery);
    
    if (foundInTerms) {
      // Highlight the found course
      setHighlightedCourse(foundInTerms.courseId);
      setShowAddTerm(false);
      
      // Scroll to the course element
      setTimeout(() => {
        const element = document.getElementById(`course-${foundInTerms.courseId}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedCourse(null);
      }, 3000);
      
    } else {
      // Check if course exists in catalog
      const foundInCatalog = findCourseInCatalog(searchQuery);
      
      if (foundInCatalog) {
        // Course exists but not in any term - show add options
        setShowAddTerm(true);
        setHighlightedCourse(null);
      } else {
        // Course doesn't exist - could add "create new course" option
        alert(`Course "${searchQuery}" not found. Would you like to create it?`);
        setShowAddTerm(false);
        setHighlightedCourse(null);
      }
    }
  };

  const handleAddToTerm = () => {
    if (!selectedTerm || !searchQuery) return;
    
    const course = findCourseInCatalog(searchQuery);
    if (course) {
      addCourseToTerm(course.id, selectedTerm);
      setShowAddTerm(false);
      setSelectedTerm('');
      setSearchQuery('');
      
      // Highlight the newly added course
      setTimeout(() => {
        setHighlightedCourse(course.id);
        const element = document.getElementById(`course-${course.id}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
          setHighlightedCourse(null);
        }, 3000);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Provide highlight state to parent components via context or prop
  useEffect(() => {
    // You can use this to pass highlight info to IndividualCourse components
    window.highlightedCourse = highlightedCourse;
  }, [highlightedCourse]);

  return (
    <div style={{ 
      margin: '20px 0', 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '12px',
      border: '2px solid #e9ecef'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🔍 Find Course</h3>
      
      {/* Search Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a course (e.g., EECS2030 or Programming)"
          style={{
            flex: 1,
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Find
        </button>
      </div>

      {/* Add to Term Options */}
      {showAddTerm && (
        <div style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          marginTop: '10px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
            Course found! Add to which term?
          </p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="">Select a term...</option>
              {terms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
            <button
              onClick={handleAddToTerm}
              disabled={!selectedTerm}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedTerm ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: selectedTerm ? 'pointer' : 'not-allowed'
              }}
            >
              Add Course
            </button>
            <button
              onClick={() => setShowAddTerm(false)}
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
        </div>
      )}
    </div>
  );
}

export default CourseSearchBar;