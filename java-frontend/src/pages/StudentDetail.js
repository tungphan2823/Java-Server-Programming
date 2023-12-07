import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import './StudentDetail.css';
const StudentDetailPage = () => {
  const params = useParams();
  const [studentCourses, setStudentCourses] = useState([]);
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8080/REST_API_PRJ/SJC/${params.studentID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudentCourses(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchStudentCourses();
  }, [params.studentID]);


  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/REST_API_PRJ/students/${params.studentID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchStudentData();
  }, [params.studentID]);
  return (
    <>
      <h1>Student Detail</h1>
      {studentCourses.length > 0 ? (
        <div className="studentContainer">
        <div className="studentDetail">
        <h1>Student</h1>
          <p>Student ID: {studentCourses[0].studentID}</p>
          <p>Name: {studentCourses[0].firstName} {studentCourses[0].lastName}</p>
          <p>Email: {studentCourses[0].email}</p>
          <h2>Courses</h2>
          <ul>
            {studentCourses.map((course, index) => (
              <li key={index}>
                <p>Course ID: {course.courseID}</p>
                <p>Course Name: {course.courseName}</p>
                <p>Teacher: {course.teacherName}</p>
                <Divider variant="inset" component="li" />
              </li>
              
            ))}
          </ul>
        </div>
        </div>
      ) : (
        <div className="studentContainer">
        <div className="studentDetail">
        <h1>Student</h1>
          <p>Student ID: {studentData.studentID}</p>
          <p>Name: {studentData.firstname} {studentData.lastname}</p>
          <p>Email: {studentData.email}</p>
          <h2>Courses</h2>
          <p>Student haven't enroll for any course</p>
        </div>
        </div>
      )}
    </>
  );
};

export default StudentDetailPage;
