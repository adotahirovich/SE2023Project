import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import apiServices from "../api/api-user";
import { Icon } from "@material-ui/core";

const UpdateProfile = ({ user, setUser, showNotification }) => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    error: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickUpdate = () => {
    const updatedInfo = {
      _id: user._id,
      name: values.name || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
    };
    apiServices
      .update(
        { userId: user._id },
        {
          t: "",
        },
        updatedInfo
      )
      .then((data) => {
        if (data && data.error) setValues({ ...values, error: data.error });
        else {
          setValues({ ...values, userId: data._id, redirectToProfile: true });
          setUser({
            ...user,
            name: updatedInfo.name,
            lastName: updatedInfo.lastName,
            email: updatedInfo.email,
          });
          setValues({
            name: values.name || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
            error: "",
          });
          showNotification("Profile updated");
          navigate("/my_profile");
          sessionStorage.setItem("token", JSON.stringify(updatedInfo));
        }
      });
  };
  return (
    <div
      style={{
        marginTop: "4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Card sx={{ minWidth: 275, width: "80%" }}>
        <CardContent
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" component="div">
            Update Profile
          </Typography>
          <TextField
            id="name"
            type="text"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="lastname"
            type="text"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange("lastName")}
            margin="normal"
          />
          <TextField
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error">
                  Error <br />
                </Icon>
                {values.error}
              </Typography>
            )}
          </div>
          <CardActions>
            <Button variant="contained" onClick={clickUpdate}>
              update
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => navigate("/my_profile")}
            >
              go back
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
