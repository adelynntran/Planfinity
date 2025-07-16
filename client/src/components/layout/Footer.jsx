

function Footer({type, data}) {
    //for debugging in console:
    console.log('Footer type: ', type);
    console.log('Footer data: ', data);
//styling
const footerStyle = {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',      // ← Add background color
    borderTop: '1px solid #e5e7eb',  // ← Add border
    padding: '16px 24px',            // ← Add padding  
    display: 'flex',                 // ← Layout the spans
    justifyContent: 'space-between', // ← Space out content
    alignItems: 'center',            // ← Center vertically
    zIndex: 1000,                    // ← Stay on top
    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)', // ← Subtle shadow
    color: '#374151',           // Dark gray text
    fontSize: '14px',           // Readable size
    fontWeight: '500',          // Slightly bold
  };

    if (type === "degree") {
        return (
            <div style={footerStyle}>
                {/*[prop].[prop's properties] */}
                <span>{data.degreeName}</span>
                <span>CGPA: {data.cgpaScale9} ({data.letterGrade})</span>
            </div>
        );
    }

    if (type === "course") {
        return (
            <div style={footerStyle}>
                <span>{data.courseName}</span>
                <span>Current: {data.currentCourseGPA}% | Target: {data.targetCourseGPA}%</span>
            </div>
        );
    }

    //default case:
    return null;

}

export default Footer;

