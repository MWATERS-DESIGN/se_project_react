import "./AddItemModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garments"
      buttonText="Add garments"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="modal__form-input">
        <label htmlFor="name" className="modal__input-label">
          Name{" "}
          <input
            type="text"
            name="name"
            id="name"
            className="modal__input"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__input-label">
          Image{" "}
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            className="modal__input"
            placeholder="Image URL"
            required
            value={values.imageUrl}
            onChange={handleChange}
          />
        </label>
      </div>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            value="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            value="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            value="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
