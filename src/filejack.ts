#! /usr/bin/env node

import boxen from "boxen";
import figlet from "figlet";
import inquirer from "inquirer";
import { OrganizeByType } from "./classes/organize-by-type.class.js";

function welcome() {
    const banner = [figlet.textSync("filejack"), "Do File Operations!."];
    const box = boxen(banner.join("\n"), {
        padding: 1,
        align: "center",
    });
    console.log(box);
}

async function main() {
    welcome();

    const tasks = [new OrganizeByType()];

    const menuQuestions = [
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: tasks.map((task) => task.menu()),
        },
    ];
    const menuAnswers = await inquirer.prompt(menuQuestions);

    const { action } = menuAnswers;

    const choosenTask = tasks.find((task) => task.menu().value === action);

    if (!choosenTask) {
        console.log("Invalid Task");
        return;
    }

    choosenTask.run();
}

main();
