import * as React from "react";
import Button from '@mui/joy/Button';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { DataContext } from "../store/App-context";
import AddBoxIcon from '@mui/icons-material/AddBox';
export default function StudentFormDialog({ setSuccessMessage }) {
  const { setStudentChange } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const [studentData, setStudentData] = React.useState({
    studentID: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudentData({ ...studentData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/REST_API_PRJ/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Student added successfully");
      setStudentChange((prevStudent) => !prevStudent);
      handleClose();
      setSuccessMessage(`Student '${studentData.firstname} ${studentData.lastname}' added successfully!`);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("");
    }
  };

  return (
    <React.Fragment>
      <Button color="neutral" size="lg" onClick={handleClickOpen}>
        <AddBoxIcon onClick={handleClickOpen}/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please create student ID follow: Sxxx , for example: S101, S102,
            S102, etc
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="studentID"
            label="Student ID"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="firstname"
            label="First Name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="lastname"
            label="Last Name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="button">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
