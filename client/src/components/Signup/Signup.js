import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiServices from "../../api/api-user";
import theme from "../../theme";

const useStyles = makeStyles({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
});

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [successfulSignIn, setSuccessfulSignIn] = useState(false);
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    password: "",
    confirmedPassword: "",
    email: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      confirmedPassword: values.confirmedPassword || undefined,
    };
    apiServices.create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
        setSuccessfulSignIn(true);
      }
    });
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="lastName"
            label="Last name"
            className={classes.textField}
            value={values.lastName}
            onChange={handleChange("lastName")}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />
          <TextField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={values.confirmedPassword}
            onChange={handleChange("confirmedPassword")}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                Error <br />
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/login")}
            className={classes.submit}
          >
            Log in instead?
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() =>
              setValues({
                name: "",
                password: "",
                confirmedPassword: "",
                email: "",
                open: false,
                error: "",
              })
            }
            className={classes.submit}
          >
            clear form
          </Button>
        </CardActions>
      </Card>
      {successfulSignIn && (
        <Dialog open={values.open}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/login">
              <Button
                color="primary"
                autoFocus="autoFocus"
                onClick={() => setSuccessfulSignIn(false)}
              >
                Sign In
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Signup;
