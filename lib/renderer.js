"use strict";

const {EOL} = require("node:os");

const {state} = require("./state");
const {color} = require("./color");

function renderContent() {
    const formattedLines = state.lines.map((line, i) => {
        const numsWidth = state.lines.length.toString().length;
        const lineText  = (i + 1).toString().padStart(numsWidth, " ")
        const numColor  = i === state.curLine
            ? `${color.Cyan}${color.Bright}`
            : `${color.Yellow}`;

        return numColor + lineText + ". " + color.Reset + line;
    });

    console.log(formattedLines.join(EOL));
}

function renderPrompt(rl) {
    const filename   = color.Blue + color.Bright +
        (state.filename || "no file") + color.Reset;
    const curLineTxt = color.Cyan + color.Bright +
        Math.min(state.lines.length, state.curLine + 1) + color.Reset;
    const promptTxt  = `${filename} line ${curLineTxt} of ${state.lines.length} > `;

    rl.setPrompt(promptTxt);
    rl.prompt(false);
}

function render(rl) {
    renderContent();
    renderPrompt(rl)
}

module.exports = {
    render,
};
