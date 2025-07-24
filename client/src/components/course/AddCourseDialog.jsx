import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useApp } from '../../context/AppContext';
import { gradePercentRange } from '../../data/mockCourses'; // Import your grade data

function AddCourseDialog({ open, onClose, onAddCourse, termName }) {
  const { state } = useApp();
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    category: '',
    grade: ''
  });

  // Category options
  const categoryOptions = [
    { value: 'Major', label: 'Major Requirement' },
    { value: 'Elective', label: 'Elective' },
    { value: 'Non-Sci', label: 'Non-Science' },
    { value: 'General', label: 'General Education' },
    { value: 'Minor', label: 'Minor Requirement' },
    { value: 'Mandatory', label: 'Mandatory' },
    { value: 'Custom', label: 'Other' }
  ];

  // Generate grade options from gradePercentRange
  const gradeOptions = [
    { value: '', label: 'No grade yet' },
    ...gradePercentRange.map(grade => ({
      value: grade.letter,
      label: `${grade.letter} (${grade.min}-${grade.max})`
    }))
  ];

  const handleInputChange = (field, value) => {
    // Remove spaces from course code
    if (field === 'code') {
      value = value.replace(/\s/g, ''); // Removes all whitespace characters
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Clean up the course code by removing spaces
    const cleanCode = formData.code.replace(/\s/g, '');
    
    // Validate required fields
    if (!cleanCode || !formData.name || !formData.credits || !formData.category) {
      alert('Please fill in all required fields (Course Code, Name, Credits, and Category)');
      return;
    }

    // Create course object
    const newCourse = {
      id: cleanCode, // Use cleaned code as ID
      code: cleanCode.toUpperCase(),
      name: formData.name,
      credits: parseInt(formData.credits),
      category: formData.category,
      description: `User-added course: ${formData.name}`,
      prerequisites: []
    };

    // Call the parent function to add the course
    onAddCourse(newCourse, formData.grade);
    
    // Reset form and close dialog
    setFormData({ code: '', name: '', credits: '', category: '', grade: '' });
    onClose();
  };

  const handleCancel = () => {
    // Reset form and close dialog
    setFormData({ code: '', name: '', credits: '', category: '', grade: '' });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Add Course to {termName}
      </DialogTitle>
      
      <DialogContent style={{ paddingTop: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Course Code */}
          <TextField
            label="Course Code *"
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            placeholder="e.g., EECS2030"
            fullWidth
            variant="outlined"
            size="small"
          />

          {/* Course Name */}
          <TextField
            label="Course Name *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Advanced Object Oriented Programming"
            fullWidth
            variant="outlined"
            size="small"
          />

          {/* Number of Credits */}
          <TextField
            label="Credits *"
            type="number"
            value={formData.credits}
            onChange={(e) => handleInputChange('credits', e.target.value)}
            placeholder="3"
            fullWidth
            variant="outlined"
            size="small"
            inputProps={{ min: 0, max: 12 }}
          />

          {/* Category */}
          <TextField
            select
            label="Category *"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            helperText="Select the course category"
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Grade (Optional) */}
          <TextField
            select
            label="Grade (Optional)"
            value={formData.grade}
            onChange={(e) => handleInputChange('grade', e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            helperText="Leave blank if not completed yet"
          >
            {gradeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </DialogContent>

      <DialogActions style={{ padding: '16px 24px' }}>
        <Button 
          onClick={handleCancel}
          color="secondary"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Add Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCourseDialog;