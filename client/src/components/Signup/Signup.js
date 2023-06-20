import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiServices from "../../api/api-user";
import theme from "../../theme";
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

const useStyles = makeStyles({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  formContainer: {
    margin: "0 auto",
    textAlign: "left",
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(0),
    color: theme.palette.common.white,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(0),
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  loginInstead: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      transform: "none",
      "& .MuiButton-label": {
        color: theme.palette.common.primary,
      },
    },
    "& .MuiButton-label": {
      color: theme.palette.text.primary,
    },
  },
  whiteButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      transform: "scale(1.1)",
      "& .MuiButton-label": {
        color: theme.palette.common.white,
      },
    },
    "& .MuiButton-label": {
      color: theme.palette.text.primary,
    },
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
        <div className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
        </div>
        <CardContent>
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
            color="primary"
            variant="contained"
            onClick={() => navigate("/login")}
            className={classes.loginInstead}
          >
            Log in instead?
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.whiteButton}
          >
            Submit
          </Button>
          <Button
            color="primary"
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
            className={classes.whiteButton}
          >
            Clear form
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
