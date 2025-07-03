import { useApp} from '../context/AppContext';

function HomePage() {
    const {state, calculateGPA} = useApp();

    return (
        <div>
            <h1>Welcome to Planfinity</h1>
            <p>Current GPA: {calculateGPA}</p>
            <p>Total Courses: {state.courses.length}</p>
        </div>
    );
}

//have to have this line
//to be able to use/import 'HomePage':
export default HomePage;