function sum(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
};
function divide(a, b) {
    return a / b;
};
function operate(operator, num1, num2) {
    switch (operator) {
        case 'sum':
            return sum(num1, num2);
            break;
        case 'subtract':
            return subtract(num1, num2);
            break;
        case 'multiply':
            return multiply(num1, num2);
            break;
        case 'divide':
            return divide(num1, num2);
            break;
    };
};

let num1;
let num2;
let operator;
let result;
let input = document.querySelector('.textBox');

// all the digit buttons can be clicked and displayed
let digitButtons = [];
for (let i = 0; i < 10; i++) {
    let num;
    num = 'b' + i;
    num = document.querySelector(`.${num}`);
    digitButtons.push(num);
};
digitButtons.forEach(item => displayDigit(item));

// all the operator can be clicked
let operatorButtons = [];
const operatorParent = document.querySelector('.column4');
const operatorSet = operatorParent.querySelectorAll('div');
operatorSet.forEach(item => 
    item.addEventListener('click', () => { 
        if (num1 && num2 && operator) {
            result = operate(operator, num1, num2);
            input.textContent = Number(result.toString().slice(0, 15));
            num1 = result;
            num2 = 0;
        };  
        return operator = item.className;
    }));

function displayDigit(div) {
    div.addEventListener('click', () => {
        if (input.textContent.length > 13) {
            input.textContent += '';
        } else {
            if (operator === undefined && num2 == 0 && input.textContent === '0.') {
                input.textContent += div.textContent;
                num1 = input.textContent;
            } else if (operator === undefined && num2 == 0) {
                num2 = undefined;
                if(input.textContent !== '') input.textContent = '';
                input.textContent += div.textContent;
                num1 = input.textContent;
            } else if (operator === undefined) {
                input.textContent += div.textContent;
                num1 = input.textContent;
            } else {
                if (!num2) input.textContent = '';
                input.textContent += div.textContent;
                num2 = input.textContent;
            }
        }

    })
};  

const equalBtn = document.querySelector('.equal');
equalBtn.addEventListener('click', () => {
    num1 = Number(num1);
    num2 = Number(num2);
    if (num2 === 0 && operator === 'divide') {
        input.textContent = `You can't divide a number by 0.`;
        input.style.cssText = 'font-size: 25px';
        num1 = undefined;
        num2 = undefined;
    } else {
        result = operate(operator, num1, num2);
        input.textContent = Number(result.toString().slice(0, 15));
        num1 = result;
        num2 = 0;
    };   
    operator = undefined;
});

const clearBtn = document.querySelector('.AC');
clearBtn.addEventListener('click', () => {
    input.textContent = '';
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
});

const pointBtn = document.querySelector('.point');
pointBtn.addEventListener('click', () => {
    if (!input.textContent.includes('.')) input.textContent += '.';
    if (result == num1) input.textContent = '0.';
});

const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', () => {
    length = input.textContent.length;
    input.textContent = input.textContent.substring(0, length - 1);
});
