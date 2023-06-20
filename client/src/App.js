import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import MainRouter from "./MainRouter";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [searchParams, setSearchParams] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState();
  useEffect(() => {
    try {
      setUser(JSON.parse(sessionStorage.getItem("token")));
      setToken(JSON.parse(getCookie("token")));
    } catch {
      setUser({});
    }
  }, []);
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const showNotification = (text) => {
    toast.dark(text, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <BrowserRouter>
      <Header
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        user={user}
        setUser={setUser}
      />
      <ToastContainer />
      <MainRouter
        searchParams={searchParams}
        setUser={setUser}
        getCookie={getCookie}
        user={user}
        token={token}
        setToken={setToken}
        showNotification={showNotification}
      />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
