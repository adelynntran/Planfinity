//Main App component (wrap with AppProvider)
import React from 'react';
import {AppProvider} from './context/AppContext';

function App() {
  return (
//wrap main App component with <AppProvider> to make
//the context available to all child components
<AppProvider>

</AppProvider>
  );
}

//always have to have this line (important):
export default App;
