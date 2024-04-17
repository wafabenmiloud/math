import React, { useState, useContext } from "react";
import "./Login.css";
import { Helmet } from "react-helmet";
import logo from "../../../assets/logo.png";
import bg from "../../../assets/login_bg.png";
import border4 from "../../../assets/login_4.png";
import border1 from "../../../assets/login_1.png";
import border2 from "../../../assets/login_2.png";
import border3 from "../../../assets/login_3.png";
import axios from "axios";
import QRCode from "react-qr-code";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyCode = ({ email }) => {
  const { getLoggedIn } = useContext(AuthContext);
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      code: code,
    };
    try {
      await axios.post("/api/verifycode", payload);
      await getLoggedIn();

      navigate("/dashboard");
      console.log("User Logged in successfully");
      console.log(loggedIn);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Code</title>
        <link rel="canonical" href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/admin" />
      </Helmet>

      <form onSubmit={handleSubmit}>
        <div className="login_text_field">
          <h6>Enter Verification Code</h6>

          <input
            type="number"
            name="code"
            id="code"
            placeholder="* * * * * *"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}

        <div className="login_button">
          <button type="submit">Send</button>
        </div>
      </form>
    </>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showQRCode, setShowQRCode] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const [secret, setSecret] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const Response = await axios.post("/api/login", payload);
      setShowQRCode(true);
      setShowLogin(false);
      setSecret(Response.data.secret);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  const accountName = "mathotop";
  const uri = `otpauth://totp/${encodeURIComponent(
    accountName
  )}?secret=${secret}&issuer=${encodeURIComponent(accountName)}`;

  return (
    <>
      <Helmet>
        <title>Admin | Login to your account</title>
        <link rel="canonical" href="https://www.master-7rqtwti-luxgbhg4vwqu6.ovhcloud-fr-1.webpaas.ovh.net/admin" />
      </Helmet>
      {showLogin && (
        <div className="login_form_wrapper">
          <div className="login_form_div none" style={{flexDirection:"row", gap:"0",height:"100%"}}>
            {" "}
            <img src={bg} alt="" className="login_bg"/>{" "}
            <div style={{display:"flex", flexDirection:"column", gap:"0",height:"100%"}}>
              <img src={border1} alt="border" style={{height:"25%"}}/>
              <img src={border2} alt="border" style={{height:"25%"}}/>
              <img src={border3} alt="border" style={{height:"25%"}}/>
              <img src={border4} alt="border" style={{height:"25%"}}/>
            </div>
          </div>
          <div className="login_form_div">
            {" "}
            <img src={logo} alt="" className="logo_login" />{" "}
            <form onSubmit={handleSubmit}>
              <div className="login_text_field">
                <h6>Adresse E-mail</h6>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login_text_field">
                <h6>Mot de passe </h6>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="* * * * * * *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="error">{error}</div>}

              <div className="login_button">
                <button type="submit">Se connecter</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showQRCode && (
        <div className="login_form_wrapper">
         <div className="login_form_div none" style={{flexDirection:"row", gap:"0",height:"100%"}}>
            {" "}
            <img src={bg} alt="" className="login_bg"/>{" "}
            <div style={{display:"flex", flexDirection:"column", gap:"0",height:"100%"}}>
              <img src={border1} alt="border" style={{height:"25%"}}/>
              <img src={border2} alt="border" style={{height:"25%"}}/>
              <img src={border3} alt="border" style={{height:"25%"}}/>
              <img src={border4} alt="border" style={{height:"25%"}}/>
            </div>
          </div>
          <div className="login_form_div2">
            <img src={logo} alt="" className="logo_login" />{" "}
            <QRCode value={uri} size={150} />
            <VerifyCode email={email} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
