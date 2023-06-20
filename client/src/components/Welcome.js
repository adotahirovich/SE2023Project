import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Forum Site By Anel and Ado
          </Typography>
          <Typography variant="h2" component="div">
            WELCOME!
          </Typography>

          <Typography variant="body1">
            This forum App is an application designed as an informative blog
            to help "" to navigate through the fast changing "tech"
            world.
          </Typography>
          <CardActions>
            <Button variant="contained" onClick={() => navigate("/all_posts")}>
              LOOK THE FORUM POSTS
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}
