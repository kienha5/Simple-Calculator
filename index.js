const btn_zero = document.getElementById("btn-0");
const btn_one = document.getElementById("btn-1");
const btn_two = document.getElementById("btn-2");
const btn_three = document.getElementById("btn-3");
const btn_four = document.getElementById("btn-4");
const btn_five = document.getElementById("btn-5");
const btn_six = document.getElementById("btn-6");
const btn_seven = document.getElementById("btn-7");
const btn_eight = document.getElementById("btn-8");
const btn_nine = document.getElementById("btn-9");

const btn_plus = document.getElementById("btn-add");
const btn_minus = document.getElementById("btn-subtract");
const btn_multiply = document.getElementById("btn-multiply");
const btn_divide = document.getElementById("btn-divide");

const btn_equal = document.getElementById("btn-equals");
const btn_clear = document.getElementById("btn-c");
const btn_clear_entry = document.getElementById("btn-ce");
const btn_decimal = document.getElementById("btn-dot");

const display = document.getElementById("output");

let res = 0;
let equation = ["", 0, ""];
let finishedCalculation = false;

function handleNumberClick(numString) {
    if (finishedCalculation) {
        display.value = "";
        equation = ["", 0, ""];
        res = 0;
        finishedCalculation = false;
    }

    if (display.value === "0" && equation[0] === "") {
        display.value = "";
    }

    display.value += numString;

    if (equation[1] === 0) {
        equation[0] += numString;
    }
    else {
        equation[2] += numString;
    }
}

function handleOperatorClick(opStr, opCode) {
    equation[1] = opCode;
    display.value += opStr;
    finishedCalculation = false;
}

// Add event listeners for number buttons
btn_zero.addEventListener("click", function() { handleNumberClick("0"); });
btn_one.addEventListener("click", function() { handleNumberClick("1"); });
btn_two.addEventListener("click", function() { handleNumberClick("2"); });
btn_three.addEventListener("click", function() { handleNumberClick("3"); });
btn_four.addEventListener("click", function() { handleNumberClick("4"); });
btn_five.addEventListener("click", function() { handleNumberClick("5"); });
btn_six.addEventListener("click", function() { handleNumberClick("6"); });
btn_seven.addEventListener("click", function() { handleNumberClick("7"); });
btn_eight.addEventListener("click", function() { handleNumberClick("8"); });
btn_nine.addEventListener("click", function() { handleNumberClick("9"); });

// Add event listener for decimal button
btn_decimal.addEventListener("click", function() {
    if (finishedCalculation) {
        display.value = "0.";
        equation = ["0.", 0, ""]; 
        finishedCalculation = false;
    }
    
    if (equation[1] === 0) {
        if (!equation[0].includes(".")) {
            if (equation[0] === "") {
                equation[0] = "0.";
                display.value = "0.";
            }
            else {                
                equation[0] += ".";
                display.value += ".";   
            }
        }
    }
    else {
        if (!equation[2].includes(".")) {
            if (equation[2] === "") {
                equation[2] = "0.";
                display.value += "0."; 
            }
            else {                
                equation[2] += ".";
                display.value += ".";   
            }
        }
    }
});

// Add event listener for clear entry button
btn_clear_entry.addEventListener("click", function() {
    if (finishedCalculation) {
        display.value = "0";
        equation = ["", 0, ""];
        res = 0;
        finishedCalculation = false;
        return;
    }

    if (equation[1] === 0) {
        equation[0] = "";
        display.value = "0";
    }
    else {
        equation[2] = "";
        
        let opSymbol = "";
        switch (equation[1]) {
            case 1: opSymbol = "+"; break;
            case 2: opSymbol = "-"; break;
            case 3: opSymbol = "x"; break;
            case 4: opSymbol = "÷"; break; 
        }
        display.value = equation[0] + opSymbol;
    }
});  

// Add event listeners for operator buttons
btn_plus.addEventListener("click", function() { handleOperatorClick("+", 1); });
btn_minus.addEventListener("click", function() { handleOperatorClick("-", 2); });            
btn_multiply.addEventListener("click", function() { handleOperatorClick("×", 3); });
btn_divide.addEventListener("click", function() { handleOperatorClick("÷", 4); }); 

// Add event listener for equals button
btn_equal.addEventListener("click", function() {
    let num1 = parseFloat(equation[0]);
    let num2 = parseFloat(equation[2]);

    if (isNaN(num1) || isNaN(num2)) {
        window.alert("Invalid input!");
        return;
    }

    switch (equation[1]) {
        case 1: res = num1 + num2; break;
        case 2: res = num1 - num2; break;
        case 3: res = Number(num1 * num2); break;
        case 4:
            if (num2 === 0) {
                window.alert("Cannot divide by zero!");
                return;
            }
            res = num1 / num2;
            break;
    }
    display.value = res;
    finishedCalculation = true;
    
    // FIXED: Push the result back into equation[0] so you can chain math
    equation = [res.toString(), 0, ""];
});

btn_clear.addEventListener("click", function() {
    display.value = "0";
    equation = ["", 0, ""];
    res = 0;
    finishedCalculation = false;
});