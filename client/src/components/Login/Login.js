import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import theme from "../../theme";
import apiServices from "../../auth/auth-user";
import auth from "../../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";

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
    color: "#FFFFFF",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
  signUpButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
  },
  loginButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  clearButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
});

const CustomLogin = ({ setUser, getCookie, setToken }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    email: "",
    redirectToReferrer: false,
    error: "",
  });

  const handleLogin = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    apiServices.signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
        setUser(JSON.parse(sessionStorage.getItem("token")));
        setToken(JSON.parse(getCookie("token")));
        navigate("/");
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          User Login
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email Address"
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
          onClick={() => navigate("/signup")}
          className={classes.signUpButton}
        >
          Sign Up instead?
        </Button>
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleLogin}
            className={classes.clearButton}
          >
            Log In
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              setValues({
                password: "",
                email: "",
                redirectToReferrer: false,
                error: "",
              })
            }
            className={classes.clearButton}
          >
            Clear
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CustomLogin;
