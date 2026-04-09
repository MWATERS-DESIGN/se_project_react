import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/headerlogo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "";
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" alt="WTWR logo" src={logo} />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <div className="header__user-container">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <NavLink to="/profile" className="header__nav-link">
            <div className="header__user-actions">
              <p className="header__username">{userName || "User"}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={userName || "User avatar"}
                  className="header__avatar"
                />
              ) : firstLetter ? (
                <div
                  className="header__avatar-placeholder"
                  aria-hidden="true"
                  title={userName}
                >
                  {firstLetter}
                </div>
              ) : (
                <img
                  src={avatar}
                  alt="default avatar"
                  className="header__avatar"
                />
              )}
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="header__auth-btns">
          <button onClick={onRegisterClick} className="header__sign-up">
            Sign Up
          </button>
          <button onClick={onLoginClick} className="header__login">
            Login
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
