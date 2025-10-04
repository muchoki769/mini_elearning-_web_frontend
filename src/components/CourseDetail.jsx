
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import './CourseDetail.css';

// const CourseDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [markingComplete, setMarkingComplete] = useState(false);

//   // Fetch course details
//   const fetchCourse = async () => {
//     try {
//       setError('');
//       const response = await axios.get(`/courses/${id}`);
//       setCourse(response.data);
//     } catch (error) {
//       console.error('Error fetching course:', error);
//       setError('Course not found or failed to load.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if course is completed
//   const checkCompletion = async () => {
//     if (!user) return;
    
//     try {
//       const response = await axios.get('/progress/user-progress');
//       const userProgress = response.data.find(progress => 
//         progress.course_id === parseInt(id)
//       );
//       setIsCompleted(userProgress?.completed || false);
//     } catch (error) {
//       console.error('Error checking completion:', error);
//     }
//   };

//   // Mark course as completed
//   const markAsCompleted = async () => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     setMarkingComplete(true);
//     try {
//       await axios.post('/progress/complete', { courseId: parseInt(id) });
//       setIsCompleted(true);
//       alert('Course marked as completed!');
//     } catch (error) {
//       console.error('Error marking course as completed:', error);
//       alert('Failed to mark course as completed. Please try again.');
//     } finally {
//       setMarkingComplete(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourse();
//     if (user) {
//       checkCompletion();
//     }
//   }, [id, user]);

//   if (loading) {
//     return (
//       <div className="course-detail">
//         <div className="container">
//           <div className="loading-section">
//             <div className="loading-spinner"></div>
//             <p>Loading course details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !course) {
//     return (
//       <div className="course-detail">
//         <div className="container">
//           <div className="error-state">
//             <h2>Course Not Found</h2>
//             <p>{error || 'The course you are looking for does not exist.'}</p>
//             <Link to="/courses" className="btn btn-primary">
//               Back to Courses
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="course-detail">
//       <div className="container">
//         {/* Back Navigation */}
//         <div className="back-nav">
//           <button onClick={() => navigate('/courses')} className="btn btn-secondary">
//             ← Back to Courses
//           </button>
//         </div>

//         {/* Course Header */}
//         <div className="course-hero">
//           <div className="course-badge">{course.category}</div>
//           <h1 className="course-title">{course.title}</h1>
//           <p className="course-instructor">By {course.instructor}</p>
          
//           <div className="course-meta">
//             <div className="meta-item">
//               <span className="meta-icon">⏱️</span>
//               <span>{course.duration} hours</span>
//             </div>
//             <div className="meta-item">
//               <span className="meta-icon">📚</span>
//               <span>{course.category}</span>
//             </div>
//             {course.enrolled_students && (
//               <div className="meta-item">
//                 <span className="meta-icon">👥</span>
//                 <span>{course.enrolled_students} enrolled</span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="course-content">
//           {/* Main Content */}
//           <div className="content-main">
//             <section className="description-section">
//               <h2>About This Course</h2>
//               <p>{course.description}</p>
//             </section>

//             {/* What You'll Learn */}
//             <section className="learning-section">
//               <h2>What You'll Learn</h2>
//               <div className="learning-points">
//                 <div className="learning-point">
//                   <span className="point-icon">✅</span>
//                   <span>Master key concepts and fundamentals</span>
//                 </div>
//                 <div className="learning-point">
//                   <span className="point-icon">✅</span>
//                   <span>Build practical projects and applications</span>
//                 </div>
//                 <div className="learning-point">
//                   <span className="point-icon">✅</span>
//                   <span>Develop industry-relevant skills</span>
//                 </div>
//                 <div className="learning-point">
//                   <span className="point-icon">✅</span>
//                   <span>Join a community of learners</span>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Sidebar */}
//           <div className="content-sidebar">
//             <div className="completion-card">
//               {user ? (
//                 isCompleted ? (
//                   <div className="completion-badge completed">
//                     <span className="badge-icon">🎉</span>
//                     <h3>Course Completed!</h3>
//                     <p>You've successfully completed this course</p>
//                   </div>
//                 ) : (
//                   <div className="completion-badge">
//                     <h3>Mark Progress</h3>
//                     <p>Track your learning journey</p>
//                     <button 
//                       onClick={markAsCompleted}
//                       disabled={markingComplete}
//                       className="btn btn-success btn-full"
//                     >
//                       {markingComplete ? 'Marking...' : 'Mark as Completed'}
//                     </button>
//                   </div>
//                 )
//               ) : (
//                 <div className="completion-badge">
//                   <h3>Start Learning</h3>
//                   <p>Sign in to track your progress</p>
//                   <Link to="/login" className="btn btn-primary btn-full">
//                     Sign In to Enroll
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './CSS/CourseDetail.css';
// import axios from 'axios';


// const CourseDetail = ({ user }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isCompleted, setIsCompleted] = useState(false);

//     useEffect(() => {
//     fetchCourse();
//     checkCompletion();
//   }, [id, user]);

//     const fetchCourse = async () => {
//         try {
//             const response = await axios.get(`/courses/${id}`);
//             setCourse(response.data);
//         } catch(error){

//           console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const checkCompletion = async () => {
//         if (!user) return;

//         try {
//         const response = await axios.get('/progress/user-progress');
//         const userProgress = response.data.find(progress => progress.course_id === parseInt(id));

//         setIsCompleted(userProgress?.completed  || false); 
//         } catch (error) {
//          console.error('Error checking completion:', error);
//         }
//     };

//       const markAsCompleted = async () => {
//          if (!user) {
//             navigate('/login');
//             return;
//             }
      

//       try{
//         await axios.post('/progress/complete', {});
//         setIsCompleted(true)
//         alert('Course marked as completed!');
//       } catch(error) {
//         console.error('Error marking course as completed:', error);
//       }
//     }

//     if(loading) {
//         return <div className='loading'>Loading course details...</div>
//     }

//     if(!course){
//         return <div className='error'>Course Not Found</div>
//     }

//     return (
//         <div className="course-detail">
//             <div className="container">
//                 <button onClick={() => navigate('/courses')} className='btn btn-secondary'>
//                     Back to Courses
//                 </button>

//                 <div className='course-header'>
//                     <h1>{course.title}</h1>
//                     <p className='instructor'>By {course.instructor}</p>
//                 </div>

//              <div className="course-content">
//                 <div className="course-info">
//                     <h2>About This Course</h2>
//                     <p>{course.description}</p>

//                  <div className="course-meta-detail">
//                     <div className="meta-item">
//                         <strong>Duration:</strong> {course.duration} hours
//                     </div>
//                     <div className="meta-item">
//                        <strong>Category:</strong> {course.category} 
//                     </div>
//                     <div className="meta-item">
//                         <strong>Created:</strong> {new Date(course.created_at).toLocaleDateString()}
//                     </div>
//                     </div> 

//                    {user && (
//                     <div className="completion-section">
//                         {isCompleted ? (
//                             <div className='completed-badge'>
//                                 ✅ You have completed this course!
//                             </div>
//                         ): (
//                        <button onClick={markAsCompleted} className="btn btn-success">
//                          Mark as Completed
//                        </button>
//                         )
//                     }
//                     </div>
//                    )}  

//                    {!user && (
//                     <div className="login-prompt">
//                         <p>Please log in to track your progress and mark courses as completed</p>
//                     </div>
//                    )} 
//                 </div>
//                 </div>   
//             </div>
//         </div>
//     )

// }
// export default CourseDetail;

//better version
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/CourseDetail.css';

const CourseDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    fetchCourse();
    if (user) {
      checkCompletion();
    }
  }, [id, user]);

  const fetchCourse = async () => {
    try {
      setError('');
      const response = await axios.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Course not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  const checkCompletion = async () => {
    try {
      const response = await axios.get(`${API_URL}/progress/user-progress`);
      const userProgress = response.data.find(progress => 
        progress.course_id === parseInt(id)
      );
      setIsCompleted(userProgress?.completed || false);
    } catch (error) {
      console.error('Error checking completion:', error);
    }
  };

  const markAsCompleted = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setMarkingComplete(true);
    try {
      await axios.post('/progress/complete', { courseId: parseInt(id) });
      setIsCompleted(true);
    } catch (error) {
      console.error('Error marking course as completed:', error);
      alert('Failed to mark course as completed. Please try again.');
    } finally {
      setMarkingComplete(false);
    }
  };

  if (loading) {
    return (
      <div className="course-detail">
        <div className="container">
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail">
        <div className="container">
          <div className="error-state">
            <h2>Course Not Found</h2>
            <p>{error || 'The course you are looking for does not exist.'}</p>
            <Link to="/courses" className="btn btn-primary">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail">
      <div className="container">
        {/* Back Navigation */}
        <div className="back-nav">
          <button onClick={() => navigate('/courses')} className="btn btn-secondary">
            ← Back to Courses
          </button>
        </div>

        {/* Course Header */}
        <div className="course-hero">
          <div className="course-badge">{course.category}</div>
          <h1 className="course-title">{course.title}</h1>
          <p className="course-instructor">By {course.instructor}</p>
          
          <div className="course-meta">
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{course.duration} hours</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📚</span>
              <span>{course.category}</span>
            </div>
            {course.enrolled_students && (
              <div className="meta-item">
                <span className="meta-icon">👥</span>
                <span>{course.enrolled_students} enrolled</span>
              </div>
            )}
          </div>
        </div>

        <div className="course-content">
          {/* Main Content */}
          <div className="content-main">
            <section className="description-section">
              <h2>About This Course</h2>
              <p>{course.description}</p>
            </section>

            {/* What You'll Learn */}
            <section className="learning-section">
              <h2>What You'll Learn</h2>
              <div className="learning-points">
                <div className="learning-point">
                  <span className="point-icon">✅</span>
                  <span>Master key concepts and fundamentals</span>
                </div>
                <div className="learning-point">
                  <span className="point-icon">✅</span>
                  <span>Build practical projects and applications</span>
                </div>
                <div className="learning-point">
                  <span className="point-icon">✅</span>
                  <span>Develop industry-relevant skills</span>
                </div>
                <div className="learning-point">
                  <span className="point-icon">✅</span>
                  <span>Join a community of learners</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="content-sidebar">
            <div className="completion-card">
              {user ? (
                isCompleted ? (
                  <div className="completion-badge completed">
                    <span className="badge-icon">🎉</span>
                    <h3>Course Completed!</h3>
                    <p>You've successfully completed this course</p>
                  </div>
                ) : (
                  <div className="completion-badge">
                    <h3>Mark Progress</h3>
                    <p>Track your learning journey</p>
                    <button 
                      onClick={markAsCompleted}
                      disabled={markingComplete}
                      className="btn btn-success btn-full"
                    >
                      {markingComplete ? 'Marking...' : 'Mark as Completed'}
                    </button>
                  </div>
                )
              ) : (
                <div className="completion-badge">
                  <h3>Start Learning</h3>
                  <p>Sign in to track your progress</p>
                  <Link to="/login" className="btn btn-primary btn-full">
                    Sign In to Enroll
                  </Link>
                </div>
              )}
            </div>

            <div className="course-info-card">
              <h3>Course Information</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{course.duration} hours</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{course.category}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Instructor:</span>
                  <span className="info-value">{course.instructor}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Created:</span>
                  <span className="info-value">
                    {new Date(course.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;