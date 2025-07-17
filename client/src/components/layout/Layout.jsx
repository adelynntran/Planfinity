import {useLocation, useParams} from 'react-router-dom';
import { useApp } from '../../context/AppContext';

//import components here:
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function Layout({children}) {
    const location = useLocation();

    //import states from context value in AppContext:
    const { getCourse, calculateCumulativeGPA, state } = useApp();
    

    //determine header content based on current route:
    const getHeaderProps = () => {
        if (location.pathname === '/') {
            return {
                title: "Welcome Chef!",
                description: "Plan A in the making..."
            };
        }
        if (location.pathname.startsWith('/course/')) {
            //extract course code from URL
            //get the third chunk (ie after the second '/' char) of the path
            const courseId = location.pathname.split('/')[2];
            const course = getCourse(courseId);

            return {
                title: course?.code || courseId,
                description: course?.name || "Course Details"
            };
        }

        //default return:
        return {
            title: "Planfinity",
            description: "Degree Planning Tool"
        };
    };

    const getFooterProps = () => {
        if (location.pathname === '/') {
            const gpaData = calculateCumulativeGPA();
            return {
                type: "degree",
                data: {
                    degreeName: state.currentPlan.name,
                    cgpaScale9: gpaData.gpa,
                    letterGrade: gpaData.letter
                }
            };
        }
        if (location.pathname.startsWith('/course/')) {
            const courseId = location.pathname.split('/')[2];
            const course = getCourse(courseId);
            return {
                type: "course",
                data: {
                    courseName: course?.code,
                    currentCourseGPA: 85, //dummy data
                    targetCourseGPA: 90 //dummy data
                }
            };
        }

        //default return
        return {type: "dgree", data: {}};
    }

    const headerProps = getHeaderProps();
    const footerProps = getFooterProps();
    
    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
        }}>
            {/*Header component*/}
            <Header
                title={headerProps.title}
                description={headerProps.description} />
            
            {/* Main content area with sidebar */}
            <div style={{
                display: 'flex',
                flex: 1,
                paddingTop: '80px',
                width: '100%'
            }}>
                {/* Main content - bigger width */}
                <main style={{
                    flex: '3',
                    width: '75%',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    overflow: 'auto'
                }}>
                    {children}
                </main>
                
                {/* Sidebar - smaller width */}
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
                    {/* Same sidebar content as before */}
                    <h3 style={{ 
                        marginTop: 0, 
                        color: '#333', 
                        fontSize: '18px',
                        textAlign: 'center',
                        marginBottom: '15px'
                    }}>Important Dates</h3>
                    
                    <div style={{ 
                        backgroundColor: '#e8f5e8', 
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '15px',
                        width: '80%',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '12px' }}>📅 Calendar</p>
                    </div>
                    
                    <div style={{ 
                        fontSize: '12px',
                        color: '#666',
                        width: '90%',
                        textAlign: 'left'
                    }}>
                        <p style={{ margin: '5px 0' }}>□ Jan 15: EECS 2030</p>
                        <p style={{ margin: '5px 0' }}>□ Jan 25: MATH 1300</p>
                        <div style={{ 
                            marginTop: '15px', 
                            fontSize: '11px',
                            textAlign: 'center',
                            padding: '8px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '4px'
                        }}>
                            
                        </div>
                    </div>
                </aside>
            </div>
            
            {/*Footer component*/}
            <Footer {...footerProps}/>
        </div>
    );
};

export default Layout;