#!/usr/bin/env node
"use strict";

const proc     = require("node:process");
const readline = require("node:readline");
const os       = require("node:os");

const {state} = require("./lib/state.js");
const {brightRed, color} = require("./lib/color.js");
const {parseArgs}           = require("./lib/arg.js");
const {parseInput}          = require("./lib/parser.js");
const {readFile, writeFile} = require("./lib/io.js");

const rl = readline.createInterface({input: proc.stdin, output: proc.stdout});
rl.on("line", rl_on_line);

parseArgs(proc.argv);

if (state.filename !== "") {
    readFile(state.filename, (lines) => {
        state.lines.push(...lines);
        main();
    });
} else {
    main();
}

function main() {
    render();

    const filename = `${color.Blue}${state.filename}${color.Reset}`;
    const prompt   = `${filename} ${state.lines.length} ${state.curLine+1} > `;
    rl.setPrompt(prompt);
    rl.prompt(false);
}

function rl_on_line(rowInput) {
    const input = rowInput.trimEnd();
    const inputDto = parseInput(input, state.curLine, state.lines.length);

    if (inputDto.command === "q") {
        quit();
        return;
    }

    // Write file
    if (inputDto.command === "w") {
        const content = state.lines.join(os.EOL);
        writeFile(state.filename, content, main);
        main();
        return;
    }

    // Delete lines
    if (inputDto.command === "d") {
        const from  = inputDto.range[0];
        const to    = inputDto.range[1];
        const count = to - from + 1;

        if (from > state.lines.length - 1 || from < 0 || count < 1 ||
            from + count > state.lines.length + 1) {
            console.error(brightRed(`"d" given invalid range: ${from+1} - ${to+1}`));
        } else {
            state.lines.splice(from, count);
            state.curLine = Math.min(from, state.lines.length - 1);
        }

        main();
        return;
    }

    if (inputDto.command === "change-current-line") {
        state.curLine = inputDto.range[0];
        main();
        return;
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
