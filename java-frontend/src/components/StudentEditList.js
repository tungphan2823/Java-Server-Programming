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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import StudentEditFormDialog from "./addEditModal";
import { DataContext } from "../store/App-context";
import "./StudentEditList.css";

export default function StudentEdit() {
  const { students, studentChange, setStudentChange } = useContext(DataContext);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedStudentId, setSelectedStudentId] = React.useState(null);

  const handleDeleteClick = (studentId) => {
    setOpenDialog(true);
    setSelectedStudentId(studentId);
  };

  const handleConfirmDelete = async () => {
    if (selectedStudentId) {
      try {
        const response = await fetch(
          `http://localhost:8080/REST_API_PRJ/students/${selectedStudentId}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to delete student:", error);
      }
    }
    setStudentChange(!studentChange);
    setOpenDialog(false);
    setSelectedStudentId(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedStudentId(null);
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
        {students.map((student, index) => (
          <React.Fragment key={student.studentID}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={`${student.firstname} ${student.lastname}`}
                  src={`/static/images/avatar/1.jpg`}
                />
              </ListItemAvatar>
              <div className="studentLayout">
                <div>
                  <Link to={student.studentID} className="LinkStudent">
                    <ListItemText
                      primary={`${student.firstname} ${student.lastname}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`${student.studentID} - ${student.email}`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Link>
                </div>
                <div className="actionButtons">
                  <StudentEditFormDialog
                    id={student.studentID}
                    lastName={student.lastname}
                    firstName={student.firstname}
                    email={student.email}
                  />
                  <HighlightOffIcon
                    onClick={() => handleDeleteClick(student.studentID)}
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
          {"Are you sure you want to delete this student?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
