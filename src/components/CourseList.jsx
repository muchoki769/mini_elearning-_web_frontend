// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";

// const CourseList = ({ user }) => {
//       const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         fetchCourses();
//     }, []);

//      const fetchCourses = async () => {
//         try{
//         const response = await axios.get('/courses');
//         setCourses(response.data);

//         } catch(error) {
//             console.log('Error fetching courses:', error);
//         } finally {
//             setLoading(false);
//         }
//      };
     
//      if (loading) {
//         return <div className="loading">Loading courses</div>
//      }

//      return(
//         <div className="course-list">
//          <div className="container">
//             <h1>Available courses</h1>
//             <div className="courses-grid">
//                 {course.map(course => (
//                     <div key = {course.id} className="course-card">
//                         <h3>{course.title}</h3>
//                         <p>{course.description}</p>

//                         <div className="course-meta">
//                       <span>Instructor: {course.instructor}</span>
//                         <span>Duration: {course.duration} hours</span>
//                         <span>Category: {course.category}</span>
//                         </div>

//                         <div className="course-stats">
//                           <span>Enrolled: {course.enrolled_students}</span> 
//                           <span>
//                             Completion:{Math.round(course.completion_rate * 100)}%
//                           </span>
//                         </div>
//                         <Link to={`/courses/${course.id}`} className="btn btn-primary">
//                         View Courses
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//             </div>   
//         </div>
//      )
// }
// export default CourseList;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// // import './CourseList.css';

// const CourseList = ({ user }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       setError('');
//       const response = await axios.get('/courses');
//       console.log('Courses data:', response.data);
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       setError('Failed to load courses. Please try again later.');
      
//       // Fallback data for development
//   //     setCourses([
//   //       {
//   //         id: 1,
//   //         title: 'JavaScript Fundamentals',
//   //         description: 'Learn the basics of JavaScript programming including variables, functions, and DOM manipulation',
//   //         instructor: 'Sarah Johnson',
//   //         duration: 8,
//   //         category: 'Programming',
//   //         enrolled_students: 150,
//   //         completion_rate: 75,
//   //         created_at: new Date().toISOString()
//   //       },
//   //       {
//   //         id: 2,
//   //         title: 'React for Beginners',
//   //         description: 'Build modern web applications with React hooks and components',
//   //         instructor: 'Mike Chen',
//   //         duration: 12,
//   //         category: 'Web Development',
//   //         enrolled_students: 200,
//   //         completion_rate: 80,
//   //         created_at: new Date().toISOString()
//   //       },
//   //       {
//   //         id: 3,
//   //         title: 'Node.js Backend Development',
//   //         description: 'Create server-side applications with Node.js and Express',
//   //         instructor: 'Alex Rodriguez',
//   //         duration: 10,
//   //         category: 'Backend Development',
//   //         enrolled_students: 120,
//   //         completion_rate: 70,
//   //         created_at: new Date().toISOString()
//   //       }
//   //     ]);
//   //   } finally {
//   //     setLoading(false);
//     }
//   };

//   // Filter courses based on category and search term
//   const filteredCourses = courses.filter(course => {
//     const matchesCategory = filter === 'all' || course.category === filter;
//     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Get unique categories for filter
//   const categories = ['all', ...new Set(courses.map(course => course.category))];

//   if (loading) {
//     return (
//       <div className="course-list">
//         <div className="container">
//           <div className="loading-section">
//             <div className="loading-spinner"></div>
//             <p>Loading courses...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="course-list">
//       <div className="container">
//         {/* Header Section */}
//         <div className="courses-header">
//           <div className="header-content">
//             <h1>Explore Our Courses</h1>
//             <p>Expand your knowledge with our curated selection of programming courses</p>
//             {user && (
//               <div className="welcome-banner">
//                 <span>Welcome back, {user.username}! Ready to learn?</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="courses-controls">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search courses, instructors..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//             <span className="search-icon">🔍</span>
//           </div>

//           <div className="filter-controls">
//             <label>Filter by category:</label>
//             <select 
//               value={filter} 
//               onChange={(e) => setFilter(e.target.value)}
//               className="category-filter"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="error-banner">
//             <p>{error}</p>
//             <button onClick={fetchCourses} className="btn btn-secondary">
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Results Count */}
//         <div className="results-info">
//           <p>
//             Showing {filteredCourses.length} of {courses.length} courses
//             {searchTerm && ` for "${searchTerm}"`}
//             {filter !== 'all' && ` in ${filter}`}
//           </p>
//         </div>

//         {/* Courses Grid */}
//         <div className="courses-grid">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map(course => (
//               <CourseCard key={course.id} course={course} />
//             ))
//           ) : (
//             <div className="no-courses">
//               <h3>No courses found</h3>
//               <p>Try adjusting your search or filter criteria</p>
//               <button 
//                 onClick={() => { setSearchTerm(''); setFilter('all'); }}
//                 className="btn btn-primary"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Course Card Component
// const CourseCard = ({ course }) => {
//   return (
//     <div className="course-card">
//       <div className="course-card-header">
//         <div className="course-category">{course.category}</div>
//         <div className="course-duration">⏱️ {course.duration}h</div>
//       </div>

//       <div className="course-card-body">
//         <h3 className="course-title">{course.title}</h3>
//         <p className="course-description">{course.description}</p>
        
//         <div className="course-instructor">
//           <span className="instructor-label">Instructor:</span>
//           <span className="instructor-name">{course.instructor}</span>
//         </div>
//       </div>

//       <div className="course-card-footer">
//         <div className="course-stats">
//           <div className="stat">
//             <span className="stat-value">{course.enrolled_students || 0}</span>
//             <span className="stat-label">Enrolled</span>
//           </div>
//           <div className="stat">
//             <span className="stat-value">{course.completion_rate || 0}%</span>
//             <span className="stat-label">Complete</span>
//           </div>
//         </div>

//         <Link to={`/courses/${course.id}`} className="btn btn-primary btn-full">
//           View Course
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CourseList;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/CourseList.css';

const CourseList = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('🔄 CourseList component mounted, starting data fetch...');
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      console.log('📡 Starting API call to /courses...');
      setError('');
      setLoading(true);
      
      const response = await axios.get('/courses');
      console.log('✅ API Response received:', response);
      console.log('📊 Response data:', response.data);
      console.log('🔢 Number of courses:', response.data.length);
      
      setCourses(response.data);
      console.log('🎯 Courses state updated successfully');
      
    } catch (error) {
      console.error('❌ Error fetching courses:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        response: error.response,
        request: error.request
      });
      
      setError('Failed to load courses. Please try again later.');
      
    } finally {
      console.log('🏁 fetchCourses completed, setting loading to false');
      setLoading(false);
    }
  };

  // Add this debug effect
  useEffect(() => {
    console.log('📊 Current state:', {
      loading,
      coursesCount: courses.length,
      courses,
      error
    });
  }, [loading, courses, error]);

  // Filter courses based on category and search term
  const filteredCourses = courses.filter(course => {
    const matchesCategory = filter === 'all' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(courses.map(course => course.category))];

  console.log('🎨 Rendering component with:', {
    loading,
    filteredCoursesCount: filteredCourses.length,
    totalCoursesCount: courses.length
  });

  if (loading) {
    console.log('⏳ Rendering loading state...');
    return (
      <div className="course-list">
        <div className="container">
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Loading courses from API...</p>
            <button onClick={fetchCourses} className="btn btn-secondary">
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-list">
      <div className="container">
        {/* Header Section */}
        <div className="courses-header">
          <div className="header-content">
            <h1>Explore Our Courses</h1>
            <p>Expand your knowledge with our curated selection of programming courses</p>
            {user && (
              <div className="welcome-banner">
                <span>Welcome back, {user.username}! Ready to learn?</span>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info - Temporary */}
        <div className="debug-info" style={{
          background: '#e3f2fd',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          <strong>Debug Info:</strong> 
          Showing {filteredCourses.length} of {courses.length} courses | 
          Loading: {loading.toString()} | 
          Error: {error || 'None'}
        </div>

        {/* Search and Filter Section */}
        <div className="courses-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-controls">
            <label>Filter by category:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={fetchCourses} className="btn btn-secondary">
              Try Again
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredCourses.length} of {courses.length} courses
            {searchTerm && ` for "${searchTerm}"`}
            {filter !== 'all' && ` in ${filter}`}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="no-courses">
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => { setSearchTerm(''); setFilter('all'); }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course }) => {
  console.log('🃏 Rendering course card:', course.id, course.title);
  return (
    <div className="course-card">
      <div className="course-card-header">
        <div className="course-category">{course.category}</div>
        <div className="course-duration">⏱️ {course.duration}h</div>
      </div>

      <div className="course-card-body">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-instructor">
          <span className="instructor-label">Instructor:</span>
          <span className="instructor-name">{course.instructor}</span>
        </div>
      </div>

      <div className="course-card-footer">
        <div className="course-stats">
          <div className="stat">
            <span className="stat-value">{course.enrolled_students || 0}</span>
            <span className="stat-label">Enrolled</span>
          </div>
          <div className="stat">
            <span className="stat-value">{course.completion_rate || 0}%</span>
            <span className="stat-label">Complete</span>
          </div>
        </div>

        <Link to={`/courses/${course.id}`} className="btn btn-primary btn-full">
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseList;



// frontend/src/components/CourseList.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import './CourseList.css';

// const CourseList = () => {
//   const { user } = useAuth();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filter, setFilter] = useState('all');

//   // Fetch courses from API
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

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Filter courses based on search and category
//   const filteredCourses = courses.filter(course => {
//     const matchesCategory = filter === 'all' || course.category === filter;
//     const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Get unique categories
//   const categories = ['all', ...new Set(courses.map(course => course.category))];

//   // Clear all filters
//   const clearFilters = () => {
//     setSearchTerm('');
//     setFilter('all');
//   };

//   if (loading) {
//     return (
//       <div className="course-list">
//         <div className="container">
//           <div className="loading-section">
//             <div className="loading-spinner"></div>
//             <p>Loading courses...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="course-list">
//         <div className="container">
//           <div className="error-banner">
//             <p>{error}</p>
//             <button onClick={fetchCourses} className="btn btn-secondary">
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="course-list">
//       <div className="container">
//         {/* Header Section */}
//         <div className="courses-header">
//           <div className="header-content">
//             <h1>Explore Our Courses</h1>
//             <p>Expand your knowledge with our curated selection of programming courses</p>
//             {user && (
//               <div className="welcome-banner">
//                 <span>Welcome back, {user.username}! Ready to learn?</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="courses-controls">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search courses, instructors, descriptions..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//             <span className="search-icon">🔍</span>
//             {searchTerm && (
//               <button 
//                 onClick={() => setSearchTerm('')}
//                 className="clear-search"
//                 title="Clear search"
//               >
//                 ✕
//               </button>
//             )}
//           </div>

//           <div className="filter-controls">
//             <label>Filter by category:</label>
//             <select 
//               value={filter} 
//               onChange={(e) => setFilter(e.target.value)}
//               className="category-filter"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category}
//                 </option>
//               ))}
//             </select>
            
//             {(searchTerm || filter !== 'all') && (
//               <button 
//                 onClick={clearFilters}
//                 className="btn btn-outline"
//               >
//                 Clear All
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="results-info">
//           <p>
//             Showing {filteredCourses.length} of {courses.length} courses
//             {searchTerm && ` for "${searchTerm}"`}
//             {filter !== 'all' && ` in ${filter}`}
//           </p>
//         </div>

//         {/* Courses Grid */}
//         <div className="courses-grid">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map(course => (
//               <CourseCard key={course.id} course={course} />
//             ))
//           ) : (
//             <div className="no-courses">
//               <h3>No courses found</h3>
//               <p>Try adjusting your search or filter criteria</p>
//               <button 
//                 onClick={clearFilters}
//                 className="btn btn-primary"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Course Card Component
// const CourseCard = ({ course }) => {
//   return (
//     <div className="course-card">
//       <div className="course-card-header">
//         <div className="course-category">{course.category}</div>
//         <div className="course-duration">⏱️ {course.duration}h</div>
//       </div>

//       <div className="course-card-body">
//         <h3 className="course-title">{course.title}</h3>
//         <p className="course-description">{course.description}</p>
        
//         <div className="course-instructor">
//           <span className="instructor-label">Instructor:</span>
//           <span className="instructor-name">{course.instructor}</span>
//         </div>
//       </div>

//       <div className="course-card-footer">
//         <div className="course-stats">
//           <div className="stat">
//             <span className="stat-value">{course.enrolled_students || 0}</span>
//             <span className="stat-label">Enrolled</span>
//           </div>
//           <div className="stat">
//             <span className="stat-value">{course.completion_rate || 0}%</span>
//             <span className="stat-label">Complete</span>
//           </div>
//         </div>

//         <Link to={`/courses/${course.id}`} className="btn btn-primary btn-full">
//           View Course
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CourseList;
