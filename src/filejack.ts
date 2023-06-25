#! /usr/bin/env node

import boxen from "boxen";
import figlet from "figlet";

console.log(
    boxen(figlet.textSync("filejack"), {
        padding: 1,
    })
);
