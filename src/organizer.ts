import inquirer, { Answers } from "inquirer";

import filetypes from "./filetypes.js";
import moment from "moment";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { log, generateLogFile } from "./logger.js";

const today = moment().format("DD-MM-YYYY");

export function organzierQuestions(): Promise<Answers> {
    const questions = [
        {
            type: "confirm",
            name: "date",
            message: "Create folders with today's date?",
            default: false,
        },
        {
            type: "confirm",
            name: "log",
            message: "Create a log file of the operation?",
            default: false,
        },
    ];
    return inquirer.prompt(questions);
}

const resolveExtenstion = (ext: string) => {
    return filetypes.find((type) => {
        return type.extensions.indexOf(ext.toLocaleLowerCase()) != -1;
    });
};

const organizeFile = (child: string, childPath: string, workingDir: string, useDate: boolean) => {
    const extension = path.extname(childPath);
    if (extension === "") {
        printStat(child, chalk.yellow.bold("Skipped ( No Extension )"));
        return;
    }
    const config = resolveExtenstion(extension.replace(".", ""));
    if (!config) {
        printStat(child, chalk.yellow.bold("Skipped ( No Config Found )"));
        return;
    }
    let fileFolder = path.resolve(workingDir, config.folder);
    if (useDate === true) {
        fileFolder = path.resolve(fileFolder, today);
    }
    if (!fs.existsSync(childPath)) {
        printStat(child, chalk.red.bold("Error ( File Not Found )"));
        return;
    }
    fs.mkdirSync(fileFolder, { recursive: true });
    if (!fs.existsSync(fileFolder)) {
        printStat(child, chalk.red.bold("Error ( Unable to create folder )"));
        return;
    }
    const oldPath = childPath;
    const newPath = path.resolve(fileFolder, child);
    fs.renameSync(oldPath, newPath);
    printStat(child, chalk.green.bold("Done"));
};

const printStat = (child: string, status: string) => {
    log(`${chalk.cyan(child)} - ${status}`);
};

export function organizeDir(workingDir: string, createLog: boolean, useDate: boolean) {
    fs.readdir(workingDir, (err, children) => {
        if (err) {
            log(chalk.red(`Error: ${err}`));
            return;
        }
        if (children.length === 0) {
            log(chalk.red(`Error: No Files Found!`));
            return;
        }
        children.forEach((child) => {
            const childPath = path.resolve(workingDir, child);
            const childStat = fs.lstatSync(childPath);
            if (childStat.isFile()) {
                organizeFile(child, childPath, workingDir, useDate);
            }
        });
        if (createLog) {
            generateLogFile(workingDir);
        }
    });
}
