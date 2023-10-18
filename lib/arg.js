"use strict"

const {brightRed} = require("./color.js");

function parseArgs(argv) {
    const argsDto = {prompt: "", filename: ""};

    switch(argv.length) {
        case 2:
            // node jed
            break;

        case 3:
            // node jed hello
            argsDto.filename = argv[2];
            break;

        case 4:
            // node jed -p 'jed> '
            if (argv[2] === "-p") {
                argsDto.prompt = argv[3];
            } else {
                console.error(brightRed("Wrong arguments. Given: " +
                                        argv.slice(2).join(" ")));
            }
            break;

        case 5:
            if (argv[2] === "-p") {
                // node jed -p 'jed> ' hello
                argsDto.prompt   = argv[3];
                argsDto.filename = argv[4];
            } else {
                // node jed hello -p 'jed> '
                argsDto.prompt   = argv[4];
                argsDto.filename = argv[2];
            }
            break;

        default:
            console.error(brightRed("Wrong arguments. Given: " +
                                    argv.slice(2).join(" ")));
            break;
    }

    return argsDto;
}

module.exports = {
    parseArgs,
};
