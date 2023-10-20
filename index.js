#!/usr/bin/env node
"use strict";

const proc     = require("node:process");
const fs       = require("node:fs");
const readline = require("node:readline");
const os       = require("node:os");

const {state}     = require("./lib/state.js");
const {brightRed, color} = require("./lib/color.js");
const {parseArgs} = require("./lib/arg.js");

const rl = readline.createInterface({input: proc.stdin, output: proc.stdout});
rl.on("line", rl_on_line);

parseArgs(proc.argv);

if (state.filename !== "") {
    readFile(state.filename);
} else {
    main();
}

function readFile(filename) {
    fs.readFile(filename, {encoding: "utf8"}, fs_readfile_ready);
}

function fs_readfile_ready(err, content) {
    if (err) {
        console.error(brightRed(err));
    } else {
        state.lines = content.trimEnd().split(/\r?\n/);
    }

    main();
}

function main() {
    render();

    const filename = `${color.Blue}${state.filename}${color.Reset}`;
    const prompt   = `${filename} ${state.lines.length} ${state.curLine} > `;
    rl.setPrompt(prompt);
    rl.prompt(false);
}

function rl_on_line(rowInput) {
    const input = rowInput.trimEnd();
    if (input === "q") {
        quit();
        return;
    }

    // Append to the end of file
    if (input === "A") {
        state.lines.push("New line");
    }

    // Write file
    if (input === "w") {
        writeFile();
    }

    main();
}

function render() {
    console.log(state.lines.map((line, i) =>
        `${color.Yellow}${i+1}${color.Reset}\t${line}`).join(os.EOL));
}

function quit() {
    console.log("Goodbye :)");
    proc.exit(0);
}

function writeFile() {
    const content = state.lines.join(os.EOL);
    fs.writeFile(state.filename, content, {encoding: "utf8"}, fs_writeFile_ready);
}

function fs_writeFile_ready(err) {
    if (err) {
        console.error(err);
    } else {
        console.log("File saved");
    }

    main();
}

