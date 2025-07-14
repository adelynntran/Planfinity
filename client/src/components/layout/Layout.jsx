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
        <div>
            {/*Header component*/}
            <Header
            title={headerProps.title}
            description={headerProps.description} />
            <main style={{ paddingTop: '80px' }}>
      {children}
    </main>
            {/*Footer component*/}
            <Footer {...footerProps}/>
        </div>
    );

    
};

export default Layout;