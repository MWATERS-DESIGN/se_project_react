import { useEffect } from "react";
import "./RegisterModal.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onRegister,
  onClose,
  isLoading,
  onLoginClick,
}) => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

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
      resetForm(defaultValues, {}, false);
    }
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!validateAll()) return;
    onRegister(values);
    resetForm(defaultValues, {}, false);
  }

  const isFormValid = isValid;

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isSubmitDisabled={!isFormValid}
      submitButtonClassName={isFormValid ? "modal__submit-btn_active" : ""}
      extraButton={
        <button
          type="button"
          className="modal__register-btn"
          onClick={onLoginClick}
        >
          or Log in
        </button>
      }
    >
      <div className="modal__form-input">
        <label htmlFor="register-email" className="modal__input-label">
          Email*
          <input
            type="email"
            name="email"
            id="register-email"
            required
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            className={`modal__input ${(touched.email || isSubmitted) && errors.email ? "modal__input_invalid" : ""}`}
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
          />
          <span
            className={`modal__error ${(touched.email || isSubmitted) && errors.email ? "modal__error_visible" : ""}`}
          >
            {errors.email || ""}
          </span>
        </label>

        <label htmlFor="register-password" className="modal__input-label">
          Password*
          <input
            type="password"
            name="password"
            id="register-password"
            required
            minLength={6}
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            className={`modal__input ${(touched.password || isSubmitted) && errors.password ? "modal__input_invalid" : ""}`}
            placeholder="Password"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span
            className={`modal__error ${(touched.password || isSubmitted) && errors.password ? "modal__error_visible" : ""}`}
          >
            {errors.password || ""}
          </span>
        </label>

        <label htmlFor="register-name" className="modal__input-label">
          Name*
          <input
            type="text"
            name="name"
            id="register-name"
            required
            minLength={2}
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            className={`modal__input ${(touched.name || isSubmitted) && errors.name ? "modal__input_invalid" : ""}`}
            placeholder="Name"
            value={values.name || ""}
            onChange={handleChange}
          />
          <span
            className={`modal__error ${(touched.name || isSubmitted) && errors.name ? "modal__error_visible" : ""}`}
          >
            {errors.name || ""}
          </span>
        </label>

        <label htmlFor="register-avatar" className="modal__input-label">
          Avatar URL*
          <input
            type="url"
            name="avatar"
            id="register-avatar"
            required
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            className={`modal__input ${(touched.avatar || isSubmitted) && errors.avatar ? "modal__input_invalid" : ""}`}
            placeholder="https://example.com/avatar.jpg"
            value={values.avatar || ""}
            onChange={handleChange}
          />
          <span
            className={`modal__error ${(touched.avatar || isSubmitted) && errors.avatar ? "modal__error_visible" : ""}`}
          >
            {errors.avatar || ""}
          </span>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
