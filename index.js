#!/usr/bin/env node
"use strict";

const proc = require("node:process");
const fs   = require("node:fs");
const {color, bright} = require("./lib/color.js");

parseArgs();

function parseArgs() {
    proc.env.prompt = "";

    if (proc.argv.length === 2) {
        // node jed
        proc.env.filename = "";
        main();
        return;
    }

    if (proc.argv.length === 3) {
        // node jed hello
        proc.env.filename = proc.argv[2];
        readFile();
        return;
    }

    if (proc.argv.length === 5) {
        if (proc.argv[2] === "-p") {
            // node jed -p 'jed> ' hello
            proc.env.prompt   = proc.argv[3];
            proc.env.filename = proc.argv[4];
            readFile();
        } else {
            // node jed hello -p 'jed> '
            proc.env.prompt   = proc.argv[4];
            proc.env.filename = proc.argv[2];
            readFile();
        }
        return;
    }

    console.error(brightRed("Wrong arguments. Given: " +
                            proc.argv.slice(2).join(" ")));
    proc.exit(1);
}

function readFile() {
    fs.readFile(proc.env.filename, {encoding: "utf8"}, fs_readfile_ready);
}

function fs_readfile_ready(err, content) {
    if (err) {
        console.error(brightRed(err));
        proc.exit(1);
    }

    console.log( content );
    main();
}


function main() {
    console.log(proc.env.prompt + "Ready!");
}

function brightRed(msg) {
    return `${color.Red}${color.Bright}${msg}${color.Reset}`;
}
