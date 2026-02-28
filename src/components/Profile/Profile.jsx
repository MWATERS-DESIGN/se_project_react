import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
