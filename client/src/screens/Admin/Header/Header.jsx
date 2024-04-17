import React, { useContext } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  async function logout() {
    await axios.get("/api/logout");

    await getLoggedIn();
    navigate("/admin");
  }
  function Avatar(props) {
    const name = props.name || "";
    const initials = name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");

    return (
      <div
        style={{
          display: "inline-block",
          width: props.size || 50,
          height: props.size || 50,
          borderRadius: "50%",
          backgroundColor: props.color || "#ccc",
          textAlign: "center",
          fontSize: 15,
          color: "#fff",
          fontWeight: "bold",
          lineHeight: props.size + "px",
          marginLeft: "2rem",
        }}
      >
        {initials}
      </div>
    );
  }
  return (
    <header>
      <Link to="/dashboard">
        {" "}
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="head">
        {/* <div className="search_field">
          <CiSearch size={20} color="#828282" />

          <input type="text" name="" id="" placeholder="Recherche" />
        </div> */}

        <div className="user">
          <Avatar size={40} color="#6bb13d" name={userInfo.username} />
        </div>
        {/*    <Link to="/notif">
          <IoIosNotificationsOutline
            className="logout"
            size={20}
            color="#828282"
          />
        </Link>*/}
        <button className="logout" onClick={logout}>
          Se déconnecter
        </button>
      </div>
    </header>
  );
};

export default Header;
