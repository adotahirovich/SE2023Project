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

const Login = ({ setUser, getCookie, setToken }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    email: "",
    redirectToReferrer: false,
    error: "",
  });

  const clickSubmit = () => {
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
          Sign In
        </Typography>
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
          onClick={() => navigate("/signup")}
          className={classes.submit}
        >
          Signup instead?
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
              password: "",
              email: "",
              redirectToReferrer: false,
              error: "",
            })
          }
          className={classes.submit}
        >
          clear
        </Button>
      </CardActions>
    </Card>
  );
};

export default Login;
