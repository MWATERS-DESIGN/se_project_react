import React, { useContext, useEffect } from "react";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateProfile, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = { name: "", imageUrl: "" };
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    resetForm,
    validateAll,
    isSubmitted,
    isValid,
    touched,
  } = useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm(
        {
          name: currentUser?.name || "",
          imageUrl: currentUser?.avatar || "",
        },
        {},
        false,
      );
    }
  }, [isOpen, currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!validateAll()) return;
    onUpdateProfile({
      name: (values.name || "").trim(),
      avatar: (values.imageUrl || "").trim(),
    });
  }

  const isFormValid = isValid;

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isSubmitDisabled={!isFormValid}
      submitButtonClassName={isFormValid ? "modal__submit-btn_active" : ""}
    >
      <div className="modal__form-input">
        <label htmlFor="name" className="modal__input-label">
          Name*
          <input
            type="text"
            name="name"
            id="name"
            className={`modal__input ${
              (touched.name || isSubmitted) && errors.name
                ? "modal__input_invalid"
                : ""
            }`}
            placeholder="Name"
            value={values.name || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            minLength={2}
            required
          />
          <span
            className={`modal__error ${
              (touched.name || isSubmitted) && errors.name
                ? "modal__error_visible"
                : ""
            }`}
          >
            {errors.name || ""}
          </span>
        </label>

        <label htmlFor="imageUrl" className="modal__input-label">
          Avatar*
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            className={`modal__input ${
              (touched.imageUrl || isSubmitted) && errors.imageUrl
                ? "modal__input_invalid"
                : ""
            }`}
            placeholder="https://example.com/avatar.jpg"
            value={values.imageUrl || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            required
          />
          <span
            className={`modal__error ${
              (touched.imageUrl || isSubmitted) && errors.imageUrl
                ? "modal__error_visible"
                : ""
            }`}
          >
            {errors.imageUrl || ""}
          </span>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
