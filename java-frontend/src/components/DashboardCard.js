import * as React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import './DashboardCard.css'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export default function DashboardCard(props) {
  return (
    <div className="MainCard">
      <Card
        size="lg"
        variant="solid"
        color="neutral"
        invertedColors
        sx={{
          width: 400,
          boxShadow: "lg",
          borderRadius: "xl",
          background: "#FFC758",
        }}
      >
        <PeopleOutlineIcon/>
        <Typography level="h3">{props.title}</Typography>
        <Typography level="h3">{props.number}</Typography>
      </Card>
    </div>
  );
}
