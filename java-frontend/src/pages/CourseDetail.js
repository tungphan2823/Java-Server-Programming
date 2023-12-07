import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import "./CourseDetail.css"; // Your CSS file for styling

const CourseDetailPage = () => {
  const params = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/REST_API_PRJ/SJC/${params.courseID}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    fetchCourseDetails();
  }, [params.courseID]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/REST_API_PRJ/courses/${params.courseID}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    fetchCourse();
  }, [params.courseID]);
  return (
    <>
      <h1>Course Detail</h1>

      {courseDetails.length > 0 ? (
        <div className="courseContainer">
          <div className="courseDetail">
            <h1>Course</h1>
            <p>Course ID: {courseDetails[0].courseID}</p>
            <p>Course Name: {courseDetails[0].courseName} </p>
            <p>Teacher: {courseDetails[0].teacherName}</p>
            <h2>Student</h2>
            <ul>
              {courseDetails.map((course, index) => (
                <li key={index}>
                  <p>Student ID: {course.studentID}</p>
                  <p>
                    Name: {course.firstName} {course.lastName}
                  </p>
                  <p>Email: {course.email}</p>
                  <Divider variant="inset" component="li" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="courseContainer">
          <div className="courseDetail">
            <h1>Course</h1>
            <p>Course ID: {course.courseID}</p>
            <p>Course Name: {course.courseName} </p>
            <p>Teacher: {course.teacherName}</p>
            <h2>Student</h2>
            <p>No Student Found</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
