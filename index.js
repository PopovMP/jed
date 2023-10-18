#!/usr/bin/env node
"use strict";

const proc = require("node:process");
const fs   = require("node:fs");
const {brightRed} = require("./lib/color.js");
const {parseArgs} = require("./lib/arg.js");

const state = {
    prompt  : "",
    filename: "",
    mode    : "cmd",
    curLine : 0,
    lines   : [],
};

const argsDto = parseArgs(proc.argv);
state.prompt   = argsDto.prompt;
state.filename = argsDto.filename;

if (state.filename !== "") {
    readFile(state.filename);
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
    console.log(state.prompt + "Ready!");
}

