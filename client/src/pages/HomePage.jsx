import { useApp} from '../context/AppContext';

function HomePage() {

    //add all context value that you want to use here:
    const { state, calculateCumulativeGPA } = useApp();
    
    //declare variables here:
    const currentCGPA = calculateCumulativeGPA();
    
    return (
      <div>
        <h1>Welcome to Planfinity</h1>
        <h2>How are you doing to day chef?</h2>
        <p>Total Courses: {state.courses.length}</p>
        <p>Current CGPA: {currentCGPA.gpa}</p>
      </div>
    );
  }

//have to have this line
//to be able to use/import 'HomePage':
export default HomePage;