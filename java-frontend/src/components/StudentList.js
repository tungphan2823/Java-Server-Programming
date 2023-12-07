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
export default function StudentList() {
  const { students } = useContext(DataContext);
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
          {students.map((student, index) => (
            <ListItem key={index}>
              <ListItemDecorator>
                <Avatar src={`/static/images/avatar/1.jpg`} />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">
                  {student.firstname} {student.lastname}{" "}
                </Typography>
                <Typography level="body-sm" noWrap>
                  {student.studentID}
                </Typography>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      </Box>
 
  );
}
