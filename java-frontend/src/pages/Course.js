import CourseFormDialog from "../components/courseModal";
import "./Course.css";
import React from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CourseEdit from "../components/CourseEditList";
const CoursePage = () => {
  const [successMessage, setSuccessMessage] = React.useState("");
  return (
    <div>
      <h1>Course Edit</h1>
      <div className="courseMain">
        <div className="courseTitle">
          <BookmarksIcon />
          <CourseFormDialog setSuccessMessage={setSuccessMessage} />
        </div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="courseEdit">
          <CourseEdit />
        </div>
      </div>
    </div>
  );
};
export default CoursePage;
