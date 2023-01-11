// UI ELEMENT
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset]");
const equalsButton = document.querySelector("[data-equal]");
const prevNumber = document.querySelector("[data-prev-num]");
const currentNumber = document.querySelector("[data-current-num]");

class Calculator {
  constructor(prevNumber, currentNumber) {
    this.prevNumber = prevNumber;
    this.currentNumber = currentNumber;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = null;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    let stringNumber = number.toString();
    let integerDigits = parseFloat(stringNumber.split(".")[0]);
    let decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentNumber.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation != null) {
      this.prevNumber.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.prevNumber.innerText = "";
    }
  }
}

const calculator = new Calculator(prevNumber, currentNumber);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

resetButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    let id = e.target.id;
    if (id == "two") {
      document.body.classList = "";
      document.body.classList.add("theme-two");
    }
    if (id == "three") {
      document.body.classList = "";

      document.body.classList.add("theme-three");
    }
    if (id == "one") {
      document.body.classList = "";
    }
  });
});
