import "./ModalWithForm.css";
import close from "../../assets/closelogo.svg";

function ModalWithForm({
  buttonText,
  title,
  isOpen,
  onClose,
  name,
  children,
  onSubmit,
  isLoading,
  submitButtonClassName = "",
  isSubmitDisabled = false,
  extraButton,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" />
        </button>
        <form
          onSubmit={onSubmit}
          name={name}
          className="modal__form"
          noValidate
        >
          {children}
          <div className="modal__actions">
            <button
              type="submit"
              className={`modal__submit-btn ${submitButtonClassName}`}
              disabled={isLoading || isSubmitDisabled}
            >
              {isLoading ? "Saving..." : buttonText}
            </button>
            {extraButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
