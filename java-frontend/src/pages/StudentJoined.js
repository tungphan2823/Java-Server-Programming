import "./StudentJoined.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/joy/Button";
import RowCard from "../components/RowCard";
import { DataContext } from "../store/App-context";
import { useContext, useState } from "react";
const StudentJoinedPage = () => {
  const { sjcData, students, courses, setSJCChange } = useContext(DataContext);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successMessage1, setSuccessMessage1] = useState("");
  // Handle dropdown changes
  const handleStudentChange = (event) => {
    setSelectedStudentId(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      studentID: selectedStudentId,
      courseID: selectedCourseId,
    };

    try {
      const response = await fetch("http://localhost:8080/REST_API_PRJ/SJC/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle response here
      console.log("Form submitted successfully");
      setSJCChange((prevSJC) => !prevSJC);
      setSuccessMessage("Enrollment successful!");
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h1>Enrollment</h1>
      <div className="enrollContainer">
        <div className="EnrollMain">
          <div className="EnrollTitle">
            <h2>Ongoing</h2>

            {successMessage1 && (
              <div className="success-message">{successMessage1}</div>
            )}
          </div>
          <div className="rowCard">
            {sjcData.map((student) => (
              <RowCard
                key={student.id}
                student={student}
                setSuccessMessage1={setSuccessMessage1}
              />
            ))}
          </div>
        </div>
        <div className="EnrollForm">
          <form onSubmit={handleSubmit}>
            <h2>New Enroll</h2>
            <div className="textInput">
              <TextField
                id="outlined-select-currency"
                select
                label="Student"
                defaultValue="EUR"
                helperText="Please select Student ID"
                value={selectedStudentId}
                onChange={handleStudentChange}
              >
                {students.map((option) => (
                  <MenuItem key={option.studentID} value={option.studentID}>
                    {option.studentID} {option.firstname} {option.lastname}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="textInput">
              <TextField
                id="outlined-select-currency"
                select
                label="Course"
                defaultValue="EUR"
                helperText="Please select Course ID"
                value={selectedCourseId}
                onChange={handleCourseChange}
              >
                {courses.map((option) => (
                  <MenuItem key={option.courseID} value={option.courseID}>
                    {option.courseID} {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <Button size="md" type="submit">
              Submit
            </Button>
            {successMessage && (
              <div className="successMessage">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default StudentJoinedPage;
