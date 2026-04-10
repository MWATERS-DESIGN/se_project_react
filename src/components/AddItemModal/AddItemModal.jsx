import { useEffect } from "react";
import "./AddItemModal.css";
// replaced import to use the new hook
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange, errors, resetForm, validateAll, isSubmitted } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen) {
      // reset form (clears values and errors) when modal opens
      resetForm(defaultValues, {}, false);
    }
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    // validate all fields and only submit if form is valid
    if (!validateAll()) return;
    onAddItem(values);
    // clear form after a successful valid submission
    resetForm(defaultValues, {}, false);
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garments"
      buttonText="Add garments"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="modal__form-input">
        <label htmlFor="add-name" className="modal__input-label">
          Name{" "}
          <input
            type="text"
            name="name"
            id="add-name"
            className={`modal__input ${isSubmitted && errors.name ? "modal__input_invalid" : ""}`}
            placeholder="Name"
            value={values.name || ""}
            onChange={handleChange}
          />
          <span
            className={`modal__error ${isSubmitted && errors.name ? "modal__error_visible" : ""}`}
          >
            {errors.name || ""}
          </span>
        </label>
        <label htmlFor="add-imageUrl" className="modal__input-label">
          Image{" "}
          <input
            type="text"
            name="imageUrl"
            id="add-imageUrl"
            className={`modal__input ${isSubmitted && errors.imageUrl ? "modal__input_invalid" : ""}`}
            placeholder="Image URL"
            value={values.imageUrl || ""}
            onChange={handleChange}
          />
          <span
            className={`modal__error ${isSubmitted && errors.imageUrl ? "modal__error_visible" : ""}`}
          >
            {errors.imageUrl || ""}
          </span>
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
            checked={values.weatherType === "hot"}
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
            checked={values.weatherType === "warm"}
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
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
        <span
          className={`modal__error ${isSubmitted && errors.weatherType ? "modal__error_visible" : ""}`}
        >
          {errors.weatherType || ""}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
