import { writeFileSync } from "fs";
import moment from "moment";
import path from "path";

let logContent = "";

export const log = (content: string) => {
    if (content === "") {
        return;
    }
    console.log(content);
    logContent += `${content.replace(/\u001b\[.*?m/g, "")}\n`;
};

export const generateLogFile = (workingDir: string) => {
    if (logContent === "") {
        return;
    }
    const filename = `opdo-${moment().format("YYYY-MM-DD-HH-m-s")}.log`;
    const logPath = path.resolve(workingDir, filename);
    writeFileSync(logPath, logContent);
};
