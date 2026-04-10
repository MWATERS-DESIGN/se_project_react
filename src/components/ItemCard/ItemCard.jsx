import { useContext } from "react";
import "./ItemCard.css";
import likebtn from "../../assets/likebtn.svg";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = Boolean(currentUser);

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked =
    isLoggedIn && item.likes?.some((id) => id === currentUser?._id);

  // className for the like button (adds active modifier when liked)
  const itemLikeButtonClassName = `card__like-icon-button ${isLiked ? "card__like-icon-button--active" : ""}`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label="Like item"
            aria-pressed={isLiked}
          >
            <img className="card__like-icon" src={likebtn} alt="Like button" />
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
