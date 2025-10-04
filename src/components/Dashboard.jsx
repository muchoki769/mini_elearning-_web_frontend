
//better version
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/Dashboard.css';

const Dashboard = ({ user }) => {
  const [progress, setProgress] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    completed: 0,
    inProgress: 0,
    totalCourses: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user progress
      const progressResponse = await axios.get('/progress/user-progress');
      setProgress(progressResponse.data);
      
      // Fetch all courses to get total count
      const coursesResponse = await axios.get('/courses');
      setCourses(coursesResponse.data);
      
      // Calculate stats
      const completedCourses = progressResponse.data.filter(course => course.completed).length;
      const inProgressCourses = progressResponse.data.filter(course => !course.completed).length;
      
      setStats({
        completed: completedCourses,
        inProgress: inProgressCourses,
        totalCourses: coursesResponse.data.length
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <h1>Welcome back, {user.username}! 👋</h1>
          <p>Continue your learning journey and track your progress</p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>Total Courses</h3>
              <div className="stat-number">{stats.totalCourses}</div>
              <p>Available to explore</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Completed</h3>
              <div className="stat-number">{stats.completed}</div>
              <p>Courses finished</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>In Progress</h3>
              <div className="stat-number">{stats.inProgress}</div>
              <p>Currently learning</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Progress</h3>
              <div className="stat-number">
                {stats.totalCourses > 0 ? Math.round((stats.completed / stats.totalCourses) * 100) : 0}%
              </div>
              <p>Overall completion</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-actions">
          <Link to="/courses" className="btn btn-primary btn-large">
            Browse All Courses
          </Link>
          {stats.inProgress > 0 && (
            <Link to="/courses" className="btn btn-secondary btn-large">
              Continue Learning
            </Link>
          )}
        </div>

        {/* Recent Progress */}
        {progress.length > 0 ? (
          <div className="progress-section">
            <div className="section-header">
              <h2>Your Learning Progress</h2>
              <Link to="/courses" className="view-all-link">
                View All Courses →
              </Link>
            </div>
            
            <div className="progress-list">
              {progress.slice(0, 3).map(item => (
                <div key={item.id} className="progress-item">
                  <div className="progress-info">
                    <h4>{item.title}</h4>
                    <p className="course-description">{item.description}</p>
                    <div className="course-meta">
                      <span className="instructor">By {item.instructor}</span>
                      {item.completed_at && (
                        <span className="completed-date">
                          Completed on {new Date(item.completed_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="progress-status">
                    {item.completed ? (
                      <span className="status-badge completed">
                        ✅ Completed
                      </span>
                    ) : (
                      <span className="status-badge in-progress">
                        📚 In Progress
                      </span>
                    )}
                    <Link 
                      to={`/courses/${item.course_id}`} 
                      className="btn btn-outline btn-small"
                    >
                      {item.completed ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <h3>Start Your Learning Journey</h3>
            <p>You haven't started any courses yet. Explore our course catalog and begin learning today!</p>
            <Link to="/courses" className="btn btn-primary btn-large">
              Explore Courses
            </Link>
          </div>
        )}

        {/* Recommended Courses */}
        {courses.length > 0 && (
          <div className="recommended-section">
            <h2>Recommended Courses</h2>
            <div className="recommended-grid">
              {courses.slice(0, 3).map(course => (
                <div key={course.id} className="recommended-card">
                  <div className="course-badge">{course.category}</div>
                  <h4>{course.title}</h4>
                  <p>{course.description.substring(0, 100)}...</p>
                  <div className="course-stats">
                    <span>⏱️ {course.duration}h</span>
                    <span>👥 {course.enrolled_students || 0} enrolled</span>
                  </div>
                  <Link 
                    to={`/courses/${course.id}`} 
                    className="btn btn-primary btn-small"
                  >
                    View Course
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;