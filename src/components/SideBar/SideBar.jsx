import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatar} alt="Terrance Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">Terrance Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
