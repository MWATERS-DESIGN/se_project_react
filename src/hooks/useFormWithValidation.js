import { useState, useCallback } from "react";

function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const v = value ?? "";
    switch (name) {
      case "name": {
        if (!v || v.trim() === "") return "Name is required.";
        if (v.trim().length < 2) return "Name must be at least 2 characters.";
        if (v.trim().length > 30) return "Name must be 30 characters or less.";
        return "";
      }
      case "imageUrl":
      case "avatar": {
        if (!v || v.trim() === "") return "Image URL is required.";
        try {
          const url = new URL(v);
          if (!["http:", "https:"].includes(url.protocol))
            return "Image URL must use http or https.";
        } catch {
          return "Image URL is not a valid URL.";
        }
        return "";
      }
      case "email": {
        if (!v || v.trim() === "") return "Email is required.";
        // simple email regex
        // eslint-disable-next-line no-useless-escape
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(v)) return "Email is not valid.";
        return "";
      }
      case "password": {
        if (!v) return "Password is required.";
        if (v.length < 6) return "Password must be at least 6 characters.";
        return "";
      }
      case "weatherType": {
        if (!v) return "Please select a weather type.";
        return "";
      }
      default:
        return "";
    }
  };

  const recomputeValidity = (errObj) => {
    setIsValid(Object.values(errObj).every((err) => !err));
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setValues((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched or the form was submitted
    setErrors((prev) => {
      const shouldValidate = touched[name] || isSubmitted;
      const newErr = { ...prev };
      if (shouldValidate) {
        newErr[name] = validateField(name, value);
      } else {
        // keep previous error for other fields
        newErr[name] = prev[name] || "";
      }
      recomputeValidity(newErr);
      return newErr;
    });
  };

  const handleBlur = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => {
      const newErr = { ...prev, [name]: validateField(name, value) };
      recomputeValidity(newErr);
      return newErr;
    });
  };

  const validateAll = useCallback(() => {
    const newErrors = {};
    // Validate all current values (fall back to initialValues keys if needed)
    const keys = Object.keys({ ...initialValues, ...values });
    keys.forEach((key) => {
      newErrors[key] = validateField(key, values[key]);
    });

    setErrors(newErrors);
    const formIsValid = Object.values(newErrors).every((err) => !err);
    setIsValid(formIsValid);
    setIsSubmitted(true);

    // mark all fields as touched so errors appear
    const allTouched = {};
    keys.forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    return formIsValid;
  }, [initialValues, values]);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsSubmitted(false);
      setTouched({});
    },
    [],
  );

  return {
    values,
    handleChange,
    handleBlur,
    setValues,
    errors,
    isValid,
    resetForm,
    validateAll,
    isSubmitted,
    touched,
  };
}

export { useFormWithValidation };
