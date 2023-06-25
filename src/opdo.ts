#! /usr/bin/env node

import boxen from "boxen";
import figlet from "figlet";

console.log(
    boxen(figlet.textSync("opdo"), {
        padding: 1,
    })
);
