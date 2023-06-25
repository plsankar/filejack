#! /usr/bin/env node

import boxen from "boxen";
import figlet from "figlet";
import inquirer, { Answers } from "inquirer";
import { organizeDir, organzierQuestions } from "./organizer.js";

const banner = [figlet.textSync("filejack"), "Do File Operations!."];

console.log(
    boxen(banner.join("\n"), {
        padding: 1,
        align: "center",
    })
);

function menuQuestion(): Promise<Answers> {
    const questions = [
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                {
                    name: "Clean Empty Folders",
                    value: 0,
                },
                {
                    name: "Oraganize Files",
                    value: 1,
                },
            ],
        },
    ];
    return inquirer.prompt(questions);
}

async function run() {
    const menuAnswers = await menuQuestion();
    const { action } = menuAnswers;
    if (action == 1) {
        const { log, date } = await organzierQuestions().then();
        organizeDir(process.cwd(), log, date);
    } else {
        console.log("Coming Soon");
    }
}

run();
