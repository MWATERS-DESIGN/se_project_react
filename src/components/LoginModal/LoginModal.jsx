import { useEffect, useState } from "react";
import "./LoginModal.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// this is the component for user authorization with necessary state variables.

const LoginModal = ({
  isOpen,
  onLogin,
  onClose,
  isLoading,
  onRegisterClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
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

  const isFormValid = isValid;

  const [serverPasswordError, setServerPasswordError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetForm(defaultValues, {}, false);
      setServerPasswordError(false);
    }
  }, [isOpen, resetForm]);

  // wrap handleChange so we can clear serverPasswordError when user edits password
  function handleFieldChange(evt) {
    if (evt.target.name === "password" && serverPasswordError) {
      setServerPasswordError(false);
    }
    handleChange(evt);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!validateAll()) return;
    setServerPasswordError(false);
    try {
      const result = await onLogin(values);
      // handle common failure patterns from onLogin
      if (
        result === false ||
        (result && result.error) ||
        (result && result.status === 401)
      ) {
        setServerPasswordError(true);
        return;
      }
      // success path - nothing else to do here
    } catch (err) {
      const msg = err && (err.message || "");
      if (/password/i.test(msg) || (err && err.status === 401)) {
        setServerPasswordError(true);
      } else {
        // other error - leave serverPasswordError false (or handle as needed)
      }
    }
  }

  const showPasswordError =
    ((touched.password || isSubmitted) && errors.password) ||
    serverPasswordError;

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      buttonText="Log in"
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
          onClick={onRegisterClick}
        >
          or Register
        </button>
      }
    >
      <div className="modal__form-input">
        <label htmlFor="email" className="modal__input-label">
          Email
          <input
            type="email"
            name="email"
            id="email"
            required
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            className={`modal__input ${
              (touched.email || isSubmitted) && errors.email
                ? "modal__input_invalid"
                : ""
            }`}
            placeholder="Email"
            value={values.email || ""}
            onChange={handleFieldChange}
          />
          <span
            className={`modal__error ${
              (touched.email || isSubmitted) && errors.email
                ? "modal__error_visible"
                : ""
            }`}
          >
            {errors.email || ""}
          </span>
        </label>

        <label
          htmlFor="password"
          className={`modal__input-label ${showPasswordError ? "modal__input-label_invalid" : ""}`}
        >
          {showPasswordError ? "Incorrect password" : "Password"}
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={6}
            onBlur={handleBlur}
            onInvalid={(e) => e.preventDefault()}
            className={`modal__input ${showPasswordError ? "modal__input_invalid" : ""}`}
            placeholder="Password"
            value={values.password || ""}
            onChange={handleFieldChange}
          />
          <span
            className={`modal__error ${showPasswordError ? "modal__error_visible" : ""}`}
          >
            {errors.password ||
              (serverPasswordError ? "Incorrect password" : "")}
          </span>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
