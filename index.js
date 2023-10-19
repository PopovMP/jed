#!/usr/bin/env node
"use strict";

const proc = require("node:process");
const fs   = require("node:fs");

const {state}     = require("./lib/state.js");
const {brightRed} = require("./lib/color.js");
const {parseArgs} = require("./lib/arg.js");

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
        console.log(content);
    }

    main();
}

function main() {
    const prompt = state.isPrompt ? state.promptTxt : "";
    console.log(prompt + "Ready!");
}

