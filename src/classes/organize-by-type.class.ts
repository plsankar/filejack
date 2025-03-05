import inquirer, { Answers } from "inquirer";
import { Task } from "./task.class.js";
import fs from "fs";
import { log, generateLogFile } from "../logger.js";
import chalk from "chalk";
import path from "path";
import filetypes from "../filetypes.js";
import moment from "moment";

export class OrganizeByType extends Task {
    today = moment().format("DD-MM-YYYY");

    private questions(): Promise<Answers> {
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

    private organizeDir(workingDir: string, createLog: boolean, useDate: boolean) {
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
                    this.organizeFile(child, childPath, workingDir, useDate);
                }
            });
            if (createLog) {
                generateLogFile(workingDir);
            }
        });
    }

    private organizeFile(child: string, childPath: string, workingDir: string, useDate: boolean) {
        const extension = path.extname(childPath);
        if (extension === "") {
            this.printStat(child, chalk.yellow.bold("Skipped ( No Extension )"));
            return;
        }
        const config = this.resolveExtenstion(extension.replace(".", ""));
        if (!config) {
            this.printStat(child, chalk.yellow.bold("Skipped ( No Config Found )"));
            return;
        }
        let fileFolder = path.resolve(workingDir, config.folder);
        if (useDate === true) {
            fileFolder = path.resolve(fileFolder, this.today);
        }
        if (!fs.existsSync(childPath)) {
            this.printStat(child, chalk.red.bold("Error ( File Not Found )"));
            return;
        }
        fs.mkdirSync(fileFolder, { recursive: true });
        if (!fs.existsSync(fileFolder)) {
            this.printStat(child, chalk.red.bold("Error ( Unable to create folder )"));
            return;
        }
        const oldPath = childPath;
        const newPath = path.resolve(fileFolder, child);
        fs.renameSync(oldPath, newPath);
        this.printStat(child, chalk.green.bold("Done"));
    }

    private resolveExtenstion(ext: string) {
        return filetypes.find((type) => {
            return type.extensions.indexOf(ext.toLocaleLowerCase()) != -1;
        });
    }

    private printStat(child: string, status: string) {
        log(`${chalk.cyan(child)} - ${status}`);
    }

    public async run() {
        const { log, date } = await this.questions();
        this.organizeDir(process.cwd(), log, date);
    }
    public menu() {
        return { name: "Organize by file type", value: "organize-by-type" };
    }
}
