import React from 'react';
import ImportantDateBox from '../important-dates/ImportantDatesBox';

function Sidebar() {
  return (
    <aside style={{
      flex: '1',          
      width: '25%',       
      backgroundColor: '#f8f9fa',
      border: '2px solid #28a745',
      padding: '15px',
      boxSizing: 'border-box',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <ImportantDateBox />
    </aside>
  );
}

export default Sidebar;