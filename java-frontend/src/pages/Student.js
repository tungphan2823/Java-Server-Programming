import "./Student.css";
import SchoolIcon from "@mui/icons-material/School";
import StudentEdit from "../components/StudentEditList";
import React from 'react';
import StudentFormDialog from "../components/addModal";
const StudentPage = () => {
  const [successMessage, setSuccessMessage] = React.useState("");
  return (
    <div>
      <h1>Student Edit</h1>
      <div className="studentMain">
        <div className="studentTitle">
          <SchoolIcon />
          <StudentFormDialog setSuccessMessage={setSuccessMessage} />
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="studentEdit">
          <StudentEdit />
        </div>
      </div>
    </div>
  );
};
export default StudentPage;
