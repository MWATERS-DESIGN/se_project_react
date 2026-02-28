import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, handleCardClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        onCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
