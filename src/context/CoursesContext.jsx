// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const CoursesContext = createContext();

// export const useCourses = () => {
//   const context = useContext(CoursesContext);
//   if (!context) {
//     throw new Error('useCourses must be used within a CoursesProvider');
//   }
//   return context;
// };

// export const CoursesProvider = ({ children }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filter, setFilter] = useState('all');


//   // Fetch all courses
//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const response = await axios.get('/courses');
      
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       setError('Failed to load courses. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//    const markCourseCompleted = async (courseId) => {
//     try {
//       await axios.post('/progress/complete', { courseId });
//     //   const progressResponse = await axios.get('/progress/user-progress');
      
//       // Update local state to reflect completion
//       setCourses(prevCourses => 
//         prevCourses.map(course => 
//           course.id === courseId 
//             ? { ...course, completed: true }
//             : course
//         )
//       );
      
//       return { success: true };
//     } catch (error) {
//       console.error('Error marking course as completed:', error);
//       return { 
//         success: false, 
//         error: error.response?.data?.message || 'Failed to mark course as completed' 
//       };
//     }
//   };

//     const filteredCourses = courses.filter(course => {
//     const matchesCategory = filter === 'all' || course.category === filter;
//     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//     const categories = ['all', ...new Set(courses.map(course => course.category))];

//     const clearFilters = () => {
//     setSearchTerm('');
//     setFilter('all');
//      };

//        useEffect(() => {
//     fetchCourses();
//   }, []);
//  const value = {
//     courses: filteredCourses,
//     allCourses: courses,
//     loading,
//     error,
//     searchTerm,
//     setSearchTerm,
//     filter,
//     setFilter,
//     categories,
//     fetchCourses,
//     markCourseCompleted,
//     clearFilters,
//     totalCourses: courses.length,
//     filteredCount: filteredCourses.length
//   };

//   return (
//     <CoursesContext.Provider value={value}>
//       {children}
//     </CoursesContext.Provider>
//   );
// };

