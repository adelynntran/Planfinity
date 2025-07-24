import { useApp} from '../context/AppContext';
import { useState } from 'react';

//import components here:
import TermCard from '../components/term/TermCard';
import CourseSearchBar from '../components/common/SearchBar';

function HomePage() {

    //add all context value that you want to use here:
    const { 
      state,
      calculateCumulativeGPA,
      getDegreeCredits,
      addTermToDegree 
    } = useApp();

    //declare hooks:
    const [newTermName, setNewTermName] = useState('');
    const [showAddTermForm, setShowAddTermForm] = useState(false);
    
    //declare variables here:
    const currentCGPA = calculateCumulativeGPA();
    const terms = Object.keys(state.currentPlan.terms);
    const totalCredits = getDegreeCredits();
    
    //declare functions:
    const handleAddTerm = () => {
      if (newTermName.trim()) {
        addTermToDegree(newTermName.trim());
        setNewTermName('');
        setShowAddTermForm(false);
      }
    };
    
    return (
        <div style={{ padding: '20px'}}>
          
          <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>            {/*<p><strong style={{ color: '#111827', fontSize: '14px' }}>Current CGPA:</strong> <strong style={{ color: '#111827', fontSize: '14px' }}>{currentCGPA.gpa}</strong></p>*/}
            <p><strong style={{ color: '#111827', fontSize: '14px' }}>Total Credits:</strong> <strong style={{ color: '#111827', fontSize: '14px' }}>{totalCredits}</strong></p>
          </div>

          <CourseSearchBar />

              {/* Add Term Button */}
          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            {!showAddTermForm ? (
              <button
                onClick={() => setShowAddTermForm(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                + Add Term to Degree
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <input
                  type="text"
                  value={newTermName}
                  onChange={(e) => setNewTermName(e.target.value)}
                  placeholder="e.g., Summer 2025"
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <button onClick={handleAddTerm} style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Add
                </button>
                <button onClick={() => { setShowAddTermForm(false); setNewTermName(''); }} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            )}
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