const jwt = require("jsonwebtoken");
class Auth {
  constructor(history, token) {
    this.history = history;
    this.token = token;
  }
  login = () => {
    localStorage.setItem("token", this.token);
    this.history.push("/");
    return window.location.reload();
  };
  updatePassword = () => {
    return localStorage.setItem("token", this.token);
  };
  isAuthenticate = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = jwt.decode(token);

      const { exp } = data;

      return Date.now() > exp;
    } else return false;
  };
  isAdmin = () => {
    const token = localStorage.getItem("token");
    const data = jwt.decode(token);
    if (data.role === "admin") {
      return true;
    } else {
      return false;
    }
  };
  handleAuth = () => {
    localStorage.setItem("token", this.token);

    return this.history.push("/");
  };
  LogOut = () => {
    localStorage.removeItem("token");
    return this.history.push("/");
  };
  message = () => {
    return true;
  };
}

export default Auth;
