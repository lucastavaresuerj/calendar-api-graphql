export class ContractError extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
  }
}

export class Contract {
  static isRequired(value, message = "The value is required") {
    if (!value || value.length == 0) {
      throw new ContractError(message, "required");
    }
  }

  static hasMinLen(value, min, message = `Must have at least ${min}`) {
    if ((value?.length || value) < min) {
      throw new ContractError(message, "minLen");
    }
  }

  static hasMaxLen(value, max, message = `Must have no more than ${max}`) {
    if ((value?.length || value) > max) {
      throw new ContractError(message, "maxLen");
    }
  }

  static isFixedLen(value, len, message = `The length is different of ${len}`) {
    if ((value?.length || value) != len) {
      throw new ContractError(message, "fixedLen");
    }
  }

  static isEmail(value, message = `"${value}" is not an valid e-mail`) {
    const checkEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!checkEmail.test(value)) {
      throw new ContractError(message, "email");
    }
  }

  static isLessThan(
    value1,
    value2,
    message = `The ${value1} is bigger than ${value2}`,
    comparator = (a, b) => a < b
  ) {
    if (!comparator(value1, value2)) {
      throw new ContractError(message, "lessThan");
    }
  }
}
