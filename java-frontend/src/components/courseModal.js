import * as React from "react";
import Button from "@mui/joy/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DataContext } from "../store/App-context";
import { useContext } from "react";
export default function CourseFormDialog({ setSuccessMessage }) {
  const { setCourseChange } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);



  const [courseData, setCourseData] = React.useState({
    courseID: "",
    name: "",
    teacherName: "",
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
        "http://localhost:8080/REST_API_PRJ/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setCourseChange((prevCourse) => !prevCourse);
      console.log("Course added successfully");
      setSuccessMessage(`Course '${courseData.name}' added successfully!`);
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("");
    }
  };

  return (
    <React.Fragment>
      <Button color="neutral" size="lg" onClick={handleClickOpen}>
        <AddBoxIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please create course ID more than 4 characters
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="courseID"
            label="Course ID"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Course Name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="teacherName"
            label="Teacher Name"
            fullWidth
            variant="standard"
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
