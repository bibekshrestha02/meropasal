const jwt = require("jsonwebtoken");
class Auth {
  constructor(history, token) {
    this.history = history;
    this.token = token;
  }
  login = () => {
    localStorage.setItem("token", this.token);
    return this.history.push("/");
    // return this.history.push("/callback");
  };
  isAuthenticate = () => {
    const token = localStorage.getItem("token");
    // const data = jwt.decode(token);
    // console.log(token);
    return token;
  };
  isAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const data = jwt.decode(token);
    // console.log(data);
    if (data.role === "admin") {
      return true;
    } else {
      return false;
    }
  };
  handleAuth = () => {
    // localStorage.setItem("Login", true);
    // localStorage.setItem("role", this.role);
    localStorage.setItem("token", this.token);

    return this.history.push("/");
  };
  LogOut = () => {
    // localStorage.removeItem("Login");
    localStorage.removeItem("token");
    return this.history.replace("/");
  };
  message = () => {
    return true;
  };
}

export default Auth;
