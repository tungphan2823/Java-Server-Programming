import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { DataContext } from "../store/App-context";
export default function RowCard({ student, setSuccessMessage1 }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { setSJCChange } = useContext(DataContext);
  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/REST_API_PRJ/SJC/${student.studentID}/${student.courseID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setIsDeleted(true);
      setSJCChange(prevSJC=>!prevSJC);
      setSuccessMessage1(`Un-enrollment of '${student.firstName} ${student.lastName}' from course '${student.courseName}' successful.`);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  

  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          Student ID: {student.studentID}
        </Typography>
        <Typography fontWeight="md" textColor="success.plainColor">
          Course ID: {student.courseID}
        </Typography>
        <Typography level="body-sm">First name: {student.firstName}</Typography>
        <Typography level="body-sm">Last name: {student.lastName}</Typography>
        <Typography level="body-sm">Email: {student.email}</Typography>
        <Typography level="body-sm">
          Course Name: {student.courseName}
        </Typography>
        <Typography level="body-sm">
          Teacher Name: {student.teacherName}
        </Typography>
      </CardContent>
      <CardOverflow>
        <DeleteForeverIcon onClick={handleDeleteClick} />
      </CardOverflow>
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to un-enroll?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
