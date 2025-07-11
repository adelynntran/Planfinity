import { useApp} from '../context/AppContext';

//import components here:
import TermCard from '../components/term/TermCard';

function HomePage() {

    //add all context value that you want to use here:
    const { state, 
        calculateCumulativeGPA,
    getDegreeCredits } = useApp();
    
    //declare variables here:
    const currentCGPA = calculateCumulativeGPA();
    const terms = Object.keys(state.currentPlan.terms);
    const totalCredits = getDegreeCredits();
    
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#2563eb', marginBottom: '10px' }}>Welcome to Planfinity</h1>
          <h2 style={{ color: '#64748b', fontSize: '18px' }}>How are you doing today chef?</h2>
          
          <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <p><strong style={{ color: '#111827', fontSize: '14px' }}>Total Courses:</strong> <strong style={{ color: '#111827', fontSize: '14px' }}></strong><strong style={{ color: '#111827', fontSize: '14px' }}>{state.courses.length}</strong></p>
            <p><strong style={{ color: '#111827', fontSize: '14px' }}>Current CGPA:</strong> <strong style={{ color: '#111827', fontSize: '14px' }}>{currentCGPA.gpa}</strong></p>
            <p><strong style={{ color: '#111827', fontSize: '14px' }}>Total Credits:</strong> <strong style={{ color: '#111827', fontSize: '14px' }}>{totalCredits}</strong></p>
          </div>
      
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
            {terms.map(termName => (
              <TermCard key={termName} termName={termName} />
            ))}
          </div>
        </div>
      );
  }

//have to have this line
//to be able to use/import 'HomePage':
export default HomePage;