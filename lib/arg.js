"use strict"

const {brightRed} = require("./color.js");
const {state}     = require("./state.js");

function parseArgs(argv) {
    switch(argv.length) {
        case 2:
            // node jed
            break;

        case 3:
            // node jed hello
            state.filename = argv[2];
            break;

        case 4:
            // node jed -p 'jed> '
            if (argv[2] === "-p") {
                state.promptTxt = argv[3];
                state.usePrompt = true;
            } else {
                console.error(brightRed("Wrong arguments. Given: " +
                                        argv.slice(2).join(" ")));
            }
            break;

        case 5:
            if (argv[2] === "-p") {
                // node jed -p 'jed> ' hello
                state.promptTxt = argv[3];
                state.usePrompt = true;
                state.filename  = argv[4];
            } else {
                // node jed hello -p 'jed> '
                state.promptTxt = argv[4];
                state.usePrompt = true;
                state.filename  = argv[2];
            }
            break;

        default:
            console.error(brightRed("Wrong arguments. Given: " +
                                    argv.slice(2).join(" ")));
            break;
    }
}

module.exports = {
    parseArgs,
};
