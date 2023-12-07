import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import "./DashboardCard.css";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import StudentList from "./StudentList";
import CourseList from "./CourseList";
export default function CourseTable() {
  return (
    <div className="MainCard">
      <Card
        size="lg"
        variant="solid"
        color="neutral"
        invertedColors
        sx={{
          maxWidth: 560,
          height: 450,
          boxShadow: "lg",
          borderRadius: "xl",
          background: "#9A6DD0",
        }}
      >
        <CollectionsBookmarkIcon />
        <Typography level="h3">Course</Typography>

        <div className="studentList">
          <CourseList/>
        </div>
      </Card>
    </div>
  );
}
