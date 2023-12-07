import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sjcData, setSJCData] = useState([]);
  const [loading, setLoading] = useState({
    students: true,
    courses: true,
    sjc: true,
  });
  const [error, setError] = useState(null);
  const [studentChange, setStudentChange] = useState(true);
  const [courseChange, setCourseChange] = useState(true);
  const [SJCChange, setSJCChange] = useState(true);

  // Fetch Students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/REST_API_PRJ/students/"
        );
        if (!response.ok) {
          throw new Error("Error fetching students");
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, students: false }));
      }
    };
    fetchStudents();
  }, [studentChange]);

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/REST_API_PRJ/courses/"
        );
        if (!response.ok) {
          throw new Error("Error fetching courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, courses: false }));
      }
    };
    fetchCourses();
  }, [courseChange]);

  // Fetch SJC Data
  useEffect(() => {
    const fetchSJCData = async () => {
      try {
        const response = await fetch("http://localhost:8080/REST_API_PRJ/SJC/");
        if (!response.ok) {
          throw new Error("Error fetching SJC data");
        }
        const data = await response.json();
        setSJCData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, sjc: false }));
      }
    };
    fetchSJCData();
  }, [SJCChange]);

  // Check if all data is loaded
  const allDataLoaded = Object.values(loading).every(
    (status) => status === false
  );

  // Render Loading or Error
  if (!allDataLoaded) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Provide data to children components
  return (
    <DataContext.Provider
      value={{
        students,
        courses,
        sjcData,
        setStudentChange,
        setCourseChange,
        setSJCChange,
        studentChange,
        courseChange,
        SJCChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
