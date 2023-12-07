import * as React from "react";

import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import { useContext } from "react";
import { DataContext } from "../store/App-context";
export default function CourseList() {
  const { courses } = useContext(DataContext);
  return (
    <Box sx={{ width: 560 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem" }}
      ></Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        {courses.map((courses, index) => (
          <ListItem key={index}>
            <ListItemDecorator>
              <Avatar src={`/static/images/avatar/1.jpg`} />
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">
                {courses.name} {" "}
              </Typography>
              <Typography level="body-sm" noWrap>
                {courses.courseID}
              </Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
