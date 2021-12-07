function createError(message, name) {
  const error = new Error(message);
  error.name = name;
  return error;
}

function addError(errors = {}, error = new Error()) {
  return { ...errors, [error.name]: error };
}

export default class Contract {
  errors = {};

  isRequired(value, message = "The value is required") {
    if (!value || value.length == 0) {
      this.errors = addError(this.errors, createError(message, "required"));
      throw this.errors["required"];
    }
  }

  hasMinLen(value, min, message = `Must have at least ${min}`) {
    if ((value.length || value) < min) {
      this.errors = addError(this.errors, createError(message, "minLen"));
      throw this.errors["minLen"];
    }
  }

  hasMaxLen(value, max, message = `Must have no more than ${max}`) {
    if ((value.length || value) > max) {
      this.errors = addError(this.errors, createError(message, "maxLen"));
      throw this.errors["maxLen"];
    }
  }

  isFixedLen(value, len, message = `The length is different of ${len}`) {
    if ((value.length || value) != len) {
      this.errors = addError(this.errors, createError(message, "fixedLen"));
      throw this.errors["fixedLen"];
    }
  }

  isEmail(value, message = `"${value}" is not an valid e-mail`) {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(value)) {
      this.errors = addError(this.errors, createError(message, "email"));
      throw this.errors["email"];
    }
  }

  isLessThan(
    value1,
    value2,
    message = `The ${value1} is bigger than ${value2}`,
    comparator = (a, b) => a < b
  ) {
    if (!comparator(value1, value2)) {
      this.errors = addError(this.errors, createError(message, "lessThan"));
      throw this.errors["lessThan"];
    }
  }

  errors() {
    return errors;
  }

  clear() {
    this.errors = {};
  }

  isValid() {
    return Object.keys(this.errors).length == 0;
  }
}
