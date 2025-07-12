//Main App component (wrap with AppProvider)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AppProvider} from './context/AppContext';

//import pages here:
import HomePage from './pages/HomePage';
import IndividualCoursePage from './pages/IndividualCoursePage';

function App() {
  return (
//wrap main App component with <AppProvider> to make
//the context available to all child components
<AppProvider>

  {/*Add <Router> to use useNavigate() */}
  <Router>
  <div className="App">

    {/* add routes to pages here*/}
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/course/:courseId/" element={<IndividualCoursePage />} />
    </Routes>
  
  </div>
  </Router>
</AppProvider>
  );
}

//always have to have this line (important):
export default App;
