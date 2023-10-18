"use strict"

const {brightRed} = require("./color.js");

function parseArgs(argv) {
    const argsDto = {prompt: "", filename: ""};

    if (argv.length === 2) {
        // node jed
        return argsDto;
    }

    if (argv.length === 3) {
        // node jed hello
        argsDto.filename = argv[2];
        return argsDto;
    }

    if (argv.length === 5) {
        if (argv[2] === "-p") {
            // node jed -p 'jed> ' hello
            argsDto.prompt   = argv[3];
            argsDto.filename = argv[4];
            return argsDto;
        } else {
            // node jed hello -p 'jed> '
            argsDto.prompt   = argv[4];
            argsDto.filename = argv[2];
            return argsDto;
        }
    }

    console.error(brightRed("Wrong arguments. Given: " +
                            argv.slice(2).join(" ")));

    return argsDto;
}

module.exports = {
    parseArgs,
};
