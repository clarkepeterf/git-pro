const readline = require("readline");

function hello(name, language) {
  let greeting = "Hello";
  switch (language.toLowerCase()) {
    case "fr":
      greeting = "Bonjour";
      break;
    case "es":
      greeting = "Hola";
      break;
    case "zh":
      greeting = "你好";
      break;
    // Add more languages as needed
    default:
      // keep "Hello"
      break;
  }
  return `${greeting}, ${name}!`;
}
const questions = [
  "What is your name?",
  "What language do you prefer? (en/fr/es/zh)",
];
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
