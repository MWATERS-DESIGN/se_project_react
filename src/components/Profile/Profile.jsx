import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onCardLike,
  onLogout,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
