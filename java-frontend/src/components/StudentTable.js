import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import './DashboardCard.css';
import StudentList from "./StudentList";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
export default function StudentTable() {
  return (
    <div className="MainCard">
    <Card
      size="lg"
      variant="solid"
      color="neutral"
      invertedColors
      sx={{
        maxWidth:'960',
        
        height: 450,
        boxShadow: "lg",
        borderRadius: "xl",
        background: "#1F4D58",
        
      }}
    >
      <LocalLibraryIcon/>
      <Typography level="h3">Students</Typography>
      <div className="studentList"><StudentList/></div>
      
    </Card>
    </div>
  );
}
