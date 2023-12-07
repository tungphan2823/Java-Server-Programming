import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { DataContext } from '../store/App-context';
import { useContext } from 'react';
export default function StudentEditFormDialog({ id, firstName, lastName, email }) {
  const {  setStudentChange } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState(firstName);
  const [lastNameValue, setLastNameValue] = useState(lastName);
  const [emailValue, setEmailValue] = useState(email);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    const studentData = {
      firstname: firstNameValue,
      lastname: lastNameValue,
      email: emailValue
    };

    try {
      const response = await fetch(`http://localhost:8080/REST_API_PRJ/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Handle response here
    } catch (error) {
      console.error('Failed to update student:', error);
    }
    setStudentChange(prevStudent => !prevStudent);
    handleClose();
  };

  return (
    <React.Fragment>
      <EditIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            fullWidth
            variant="standard"
            value={firstNameValue}
            onChange={(e) => setFirstNameValue(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            fullWidth
            variant="standard"
            value={lastNameValue}
            onChange={(e) => setLastNameValue(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
