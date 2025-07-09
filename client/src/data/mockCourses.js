//dummy courses database
export const mockCourses = [
    //EECS courses
    {
        id: 'EECS2030',
        code: 'EECS 2030',
        name: 'Advanced Object Oriented Programming',
        credits: 3,
        category: 'Mandatory',
        prerequisites: [['EECS1021', 'EECS1022', 'EECS1720']] //either or
        //postrequisites: []
    },

    {
        id: 'EECS2021',
        code: 'EECS 2021',
        name: 'Computer Organization',
        credits: 4,
        category: 'Mandatory',
        prerequisites: [['EECS1021', 'EECS1022', 'EECS1720']] //either or
        //postrequisites: []
    },

    {
        id: 'EECS2001',
        code: 'EECS 2001',
        name: 'Introduction To Theory Of Computing',
        credits: 3,
        category: 'Mandatory',
        prerequisites: [
            ['EECS1019', 'MATH1019', 'EECS1028', 'MATH1028'], //either or
            //and this:
            ['EECS1021', 'EECS1022']
        ]
        //postrequisites: []
    },

    {
        id: 'EECS2101',
        code: 'EECS 2101',
        name: 'Fundamentals Of Data Structures',
        credits: 3,
        category: 'Mandatory',
        prerequisites: [['EECS1019', 'MATH1019', 'EECS1028', 'MATH1028'], //either or
        //and this:    
        ['EECS2030']
    ] 
        //postrequisites: []
    },

    //MATH courses
    {
        id: 'MATH2030',
        code: 'MATH 2030',
        name: 'Elementary Probability',
        credits: 3,
        category: 'Mandatory',
        prerequisites: [['MATH1310', 'MATH1014']] //either or
        //postrequisites: []
    },

    //Elective courses
    {
        id: 'ECON1000',
        code: 'ECON 1000',
        name: 'Microeconomics',
        credits: 3,
        category: 'Elective',
        prerequisites: [['None']] //either or
        //postrequisites: []
    },

    {
        id: 'CMA1701',
        code: 'CMA 1701',
        name: 'Hollywood Old And New',
        credits: 3,
        category: 'Elective',
        prerequisites: [['None']] //either or
        //postrequisites: []
    }

];

//grade point mapping
export const gradePercentRange = [
    {min: 90, max: 100, letter: 'A+', gpa: 9},
    {min: 80, max: 89, letter: 'A', gpa: 8},
    {min: 75, max: 79, letter: 'B+', gpa: 7},
    {min: 70, max: 74, letter: 'B', gpa: 6},
    {min: 65, max: 69, letter: 'C+', gpa: 5},
    {min: 60, max: 64, letter: 'C', gpa: 4},
    {min: 55, max: 59, letter: 'D+', gpa: 3},
    {min: 50, max: 54, letter: 'D', gpa: 2},
    {min: 45, max: 49, letter: 'E', gpa: 1},
    {min: 0, max: 44, letter: 'F', gpa: 0},
];

//initial empty plan structure
export const initialTerms = {
    'Fall 2425': ['EECS2030', 'MATH1090'],
    'Winter 2425': ['EECS2031'],
    'Fall 2526': [],
    'Winter 2526': [],
    'Fall 2627': [],
    'Winter 2627': [],
    'Fall 2728': [],
    'Winter 2728': []
};

//sample important dates
export const mockImportantDates = [
    {
        id: 1,
        title: 'EECS 2101 Assignment 3',
        date: '2025-07-05', //yyyy-mm-dd
        type: 'assignment',
        courseId: 'EECS2101',
        completed: false,
        notes: 'Rewatch lecture 11'
    },

    {
        id: 2,
        title: 'EECS 2101 Written test 2',
        date: '2025-07-08',
        type: 'test',
        courseId: 'EECS2101',
        completed: false,
        notes: 'Cover from lecture 1-20'
    },

    {
        id: 3,
        title: 'MATH 1090 Final exam',
        date: '2025-08-14',
        type: 'exam',
        courseId: 'MATH1090',
        completed: false,
        notes: 'Study and watch lectures'
    }
];