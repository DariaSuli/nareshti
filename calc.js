let a = "";
let b = "";
let sign = "";
let finish = false;
let isPositive = true;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "*", "/", "%"];

const numberMappings = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};

const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  isPositive = true;
  out.textContent = "0";
}

document.querySelector(".plus-minus").onclick = () => {
  if (out.textContent !== "0") {
    if (isPositive) {
      out.textContent = "-" + out.textContent;
      isPositive = false;
    } else {
      out.textContent = out.textContent.slice(1);
      isPositive = true;
    }

    if (sign === "") {
      if (finish) {
        a = out.textContent;
        b = "";
      } else {
        b = out.textContent;
      }
    }
  }
};

document.querySelector(".ac").onclick = clearAll;

document.querySelector(".buttons").onclick = (event) => {
  if (!event.target.classList.contains("btn")) return;
  if (event.target.classList.contains("ac")) return;
  out.textContent = "";
  let buttonText = event.target.textContent;
  const key = buttonText;

  if (numberMappings.hasOwnProperty(buttonText)) {
    buttonText = numberMappings[buttonText];
  }

  if (digit.includes(buttonText)) {
    if (b === "" && sign === "") {
      a += buttonText;
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = buttonText;
      finish = false;
      out.textContent = b;
    } else {
      b += buttonText;
      out.textContent = b;
    }
    console.table(a, b, sign);
    return;
  }

  if (action.includes(buttonText)) {
    sign = buttonText;
    out.textContent = sign;
    console.log(a, b, sign);
    return;
  }
  if (key === "=") {
    if (b === "") b = a;
    switch (sign) {
      case "+":
        a = +a + +b;
        break;
      case "-":
        a = a - b;
        break;
      case "*":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          out.textContent = " bro";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
      case "%":
        b = (a / 100) * b;
        a = b;
        break;
    }
    finish = true;
    out.textContent = a;
    console.table(a, b, sign);
  }
};
