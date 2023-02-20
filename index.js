#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Siapa yang mau jadi Javascript Millionaire?"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
  ${chalk.bgBlue("Bagaimana Cara Bermainnya?")}
  Aku akan memproses dalam komputer kamu.
  Jika kamu menjawab salah, maka aku akan ${chalk.bgRed("killed")}
  Jadi coba jawab pertanyaannya dengan benar...
  
  
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Siapa namamu?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Javascript dibuat dalam 10 hari sebelum dirilis\n",
    choices: [
      "23 Mei 1995",
      "24 November 1995",
      "4 Desember 1995",
      "17 Desember 1996",
    ],
  });
  return handleAnswer(answers.question_1 == "4 Desember 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("cek jawaban...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. Itu jawaban yang benar!!`,
    });
  } else {
    spinner.error({ text: `Game over, kamu kalah ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats, ${playerName} \n $ 1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}
await welcome();
await askName();
await question1();
winner();
