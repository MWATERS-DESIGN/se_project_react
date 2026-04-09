import React, { useContext } from "react";
import "./SideBar.css";
import defaultAvatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../context/CurrentUserContext.js";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const displayName = (currentUser && currentUser.name) || "Terrance Tegegne";
  const firstLetter = displayName ? displayName.charAt(0).toUpperCase() : "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={displayName}
            className="sidebar__avatar"
          />
        ) : firstLetter ? (
          <div
            className="sidebar__avatar-placeholder"
            aria-hidden="true"
            title={displayName}
          >
            {firstLetter}
          </div>
        ) : (
          <img
            src={defaultAvatar}
            alt={displayName}
            className="sidebar__avatar"
          />
        )}

        <p className="sidebar__username">{displayName}</p>
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__button sidebar__button_edit"
          onClick={onEditProfile}
        >
          Change profile data
        </button>

        <button
          type="button"
          className="sidebar__button sidebar__button_logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
