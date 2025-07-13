import {useLocation, useParams} from 'react-router-dom';
import { useApp } from '../../context/AppContext';

//import components here:
import Header from '../layout/Header';

function Layout({children}) {
    const location = useLocation();
    const { getCourse } = useApp();
    

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

    const headerProps = getHeaderProps();
    return (
        <div>
            {/*Header component*/}
            <Header
            title={headerProps.title}
            description={headerProps.description} />
            <main style={{ paddingTop: '80px' }}>
      {children}
    </main>
        </div>
    );
};

export default Layout;