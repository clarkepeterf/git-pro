const readline = require("readline");

function hello(name, exclamation) {
  return `Hello, ${name}${exclamation === "n" ? "." : "!"}`;
}

const questions = ["What is your name?", "Should I shout? (y/n)"];
const answers = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(i) {
  if (i < questions.length) {
    rl.question(questions[i] + " ", (answer) => {
      answers.push(answer);
      askQuestion(i + 1);
    });
  } else {
    console.log(hello(...answers));
    rl.close();
  }
}

askQuestion(0);
