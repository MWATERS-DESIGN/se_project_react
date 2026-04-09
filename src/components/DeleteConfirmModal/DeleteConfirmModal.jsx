import React from "react";
import "./DeleteConfirmModal.css";
import close from "../../assets/closelogo.svg";
function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      aria-hidden={!isOpen}
    >
      <div
        className="modal__content modal_type_delete-confirm"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="modal__title_delete-btn">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" />
        </button>

        <div className="modal__actions">
          <button
            onClick={onConfirm}
            className="modal__submit-btn modal__submit-btn_delete"
            type="button"
          >
            Yes, delete item
          </button>

          <button
            onClick={onClose}
            className="modal__submit-btn modal__submit-btn_cancel"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
