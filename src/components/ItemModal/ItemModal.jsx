import "./ItemModal.css";
import close from "../../assets/whiteclose.svg";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const handleDeleteClick = () => {
    onDeleteItem(card);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button onClick={handleDeleteClick} className="modal__delete-btn">
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
