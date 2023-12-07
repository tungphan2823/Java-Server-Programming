import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CourseEditFormDialog from "./CourseEditModal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { DataContext } from "../store/App-context";
import "./StudentEditList.css";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CourseEdit() {
  const { courses, setCourses, setCourseChange } = useContext(DataContext);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);
  const [courseNameToDelete, setCourseNameToDelete] = React.useState("");
  const handleDeleteClick = (id, name) => {
    setOpenDialog(true);
    setSelectedCourseId(id);
    setCourseNameToDelete(name);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleConfirmDelete = async () => {
    if (selectedCourseId) {
      try {
        const response = await fetch(
          `http://localhost:8080/REST_API_PRJ/courses/${selectedCourseId}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Course deleted successfully");
        setCourseChange((prevCourse) => !prevCourse);
        setCourses(
          courses.filter((course) => course.courseID !== selectedCourseId)
        );
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
    setOpenDialog(false);
    setSelectedCourseId(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedCourseId(null);
  };
  const handleCombinedClick = () => {
    handleConfirmDelete();
    handleClick();
  };

  return (
    <div style={{ paddingTop: "1rem" }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          color: "black",
          borderRadius: "2rem",
          padding: "1rem",
        }}
      >
        {courses.map((course, index) => (
          <React.Fragment key={course.courseID}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={course.name}
                  src={`/static/images/courses/${course.courseID}.jpg`}
                />
              </ListItemAvatar>
              <div className="studentLayout">
                <div>
                  <Link to={course.courseID} className="LinkStudent">
                    <ListItemText
                      primary={course.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`${course.courseID} - ${course.teacherName}`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Link>
                </div>
                <div className="actionButtons">
                  <CourseEditFormDialog
                    id={course.courseID}
                    name={course.name}
                    teacherName={course.teacherName}
                  />
                  <HighlightOffIcon
                    onClick={() => handleDeleteClick(course.courseID, course.name)}
                  />
                </div>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {/* Dialog for deletion confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this course?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button onClick={handleCombinedClick} autoFocus>
              Yes
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={10000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {`Course '${courseNameToDelete}' deleted successfully!`}
              </Alert>
            </Snackbar>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
