import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { DataContext } from "../store/App-context";
export default function CourseEditFormDialog({ id, name, teacherName }) {
  const [open, setOpen] = React.useState(false);
  const { setCourseChange } = useContext(DataContext);
  const [courseData, setCourseData] = React.useState({
    name,
    teacherName,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCourseData({ ...courseData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/REST_API_PRJ/courses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Course updated successfully");
      setCourseChange(prevCourse=> !prevCourse);
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <React.Fragment>
      <EditIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course Name"
            fullWidth
            variant="standard"
            value={courseData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="teacherName"
            label="Teacher Name"
            fullWidth
            variant="standard"
            value={courseData.teacherName}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
