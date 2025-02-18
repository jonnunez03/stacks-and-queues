// BE SURE TO IMPORT YOUR STACK CLASS
import { Queue } from "./1-queue";
import { Stack } from "./2-stack";
// ==============================
// 1️⃣ Reverse a String Using a Stack
// ==============================
// Write a function that takes a string as input and returns the reversed string using a stack.
// You may only use stack operations (`push`, `pop`, `isEmpty`).
const reverseString = (str: string, stack = new Stack<string>): string => {
  const result: string[] = [];
  for(const char of str) {
    stack.push(char);
  }
  while(!stack.isEmpty()) {
    result.push(stack.pop()!);
  }
  return result.join('');
}
// Example Test Cases:
// console.log(reverseString("hello")) // "olleh"
// console.log(reverseString("world")) // "dlrow"
// console.log(reverseString("")) // ""
// console.log(reverseString("abcd")) // "dcba"

// ==============================
// 2️⃣ Check for Balanced Parentheses
// ==============================
// Given a string containing only the characters `()`, `{}`, and `[]`,
// write a function to determine if the string is valid.
// A string is valid if brackets are closed in the correct order. Use a stack to track open brackets.
const isValidParentheses = (str: string, stack = new Stack<number>()): boolean => {
  for(let i = 0; i < str.length; i++) {
    let charCode: number = str.charCodeAt(i);
    if(charCode === 125 || charCode === 93) {
      charCode -= 2;
    } else if(charCode === 41) charCode -= 1;
    stack.push(charCode);
  }
  const length = stack.size();
  for(let j = 0; j < str.length / 2; j++ ) {
    let charCode: number = str.charCodeAt(j);
    if(charCode === stack.peek()) {
      stack.pop();
    }
  }
  return length / 2 === stack.size() ? true : false;
}
// I tested other cases but this only accounts for it all parenthesis are all in order and none splitting others. I wasn't quite sure with the instructions 
// Example Test Cases:
// console.log(isValidParentheses("({[]})")) // true
// console.log(isValidParentheses("({[)]}")) // false
// console.log(isValidParentheses("()")) // true
// console.log(isValidParentheses("{[()]}")) // true
// console.log(isValidParentheses("(((")) // false

// ==============================
// 3️⃣ Evaluate a Postfix Expression
// ==============================
// Write a function that evaluates a mathematical expression in **postfix notation** (Reverse Polish Notation).
// The function should use a stack to process numbers and operators.
// Assume the input is a space-separated string of numbers and `+`, `-`, `*`, or `/` operators.
const evaluatePostfix = (str: string): number => {
  const stack = new Stack<any>();
  const arr: string[] = str.split(' ');

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];

    if (!isNaN(Number(char))) {
      stack.push(Number(char));
    } else {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      
      let result: number;
      switch (char) {
        case '+':
          result = operand1! + operand2!;
          break;
        case '-':
          result = operand1! - operand2!;
          break;
        case '*':
          result = operand1! * operand2!;
          break;
        case '/':
          result = operand1! / operand2!;
          break;
      }
      stack.push(result!);
    }
  }
  return stack.pop()!;
};
// Example Test Cases:
// console.log(evaluatePostfix("3 4 +")) // 7
// console.log(evaluatePostfix("5 1 2 + 4 * + 3 -")) // 14
// console.log(evaluatePostfix("10 2 8 * + 3 -")) // 23
// console.log(evaluatePostfix("6 2 /")) // 3
// console.log(evaluatePostfix("4 5 * 2 /")) // 10
// console.log(evaluatePostfix("5 3 2 + *")); // 25
// console.log(evaluatePostfix("10 5 3 + * 2 /")); // 40

// ==============================
// 4️⃣ Next Greater Element
// ==============================
// Given an array of integers, find the **next greater element** for each element.
// The next greater element of an element **x** is the first element to the right that is greater than **x**.
// If none exists, return `-1` for that element. Use a stack for efficiency.
const nextGreaterElement = (arr: number[], stack = new Stack<number>()): number[] => {
  const result: number[] = new Array(arr.length).fill(-1);
  for (let i = arr.length - 1; i >= 0; i--) {
    while (!stack.isEmpty() && stack.peek()! <= arr[i]) {
      stack.pop();
    }
    if (!stack.isEmpty()) {
      result[i] = stack.peek()!;
    }
    stack.push(arr[i]);
  }
  return result;
};
// Example Test Cases:
// console.log(nextGreaterElement([4, 5, 2, 10, 8])) // [5, 10, 10, -1, -1]
// console.log(nextGreaterElement([3, 2, 1])) // [-1, -1, -1]
// console.log(nextGreaterElement([1, 3, 2, 4])) // [3, 4, 4, -1]

// ==============================
// 5️⃣ Daily Temperatures
// ==============================
// Given an array `temperatures` where `temperatures[i]` is the temperature on day `i`,
// return an array **answer** where `answer[i]` is the number of days you have to wait after the `i-th` day
// to get a warmer temperature. If there is no future day with a warmer temperature, return `0`.
const dailyTemperatures = (arr: number[], stack = new Stack<number>()): number[] => {
  const result: number[] = new Array(arr.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    while (!stack.isEmpty() && arr[stack.peek()!] < arr[i]) {
      const prevDay = stack.pop()!;
      result[prevDay] = i - prevDay; 
    }
    stack.push(i); 
  }
  return result;
};
// Example Test Cases:
// console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])) // [1, 1, 4, 2, 1, 1, 0, 0]
// console.log(dailyTemperatures([30, 40, 50, 60])) // [1, 1, 1, 0]
// console.log(dailyTemperatures([30, 20, 10])) // [0, 0, 0]
