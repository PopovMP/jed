"use strict";

const {equal} = require("assert");
const {describe, it, afterEach} = require("node:test");

const {state}     = require("../lib/state.js");
const {parseArgs} = require("../lib/arg.js");

describe("parseArgs", () => {

    const stateCopy = {
        promptTxt: state.promptTxt,
        usePrompt: state.usePrompt,
        filename : state.filename,
    };

    afterEach(() => {
        state.promptTxt = stateCopy.promptTxt;
        state.usePrompt = stateCopy.usePrompt;
        state.filename  = stateCopy.filename;
    });

    it("no args", () => {
        parseArgs(["node", "jed"]);

        equal(state.promptTxt, "*");
        equal(state.usePrompt, false);
        equal(state.filename, "");
    });

    it("filename", () => {
        parseArgs(["node", "jed", "filename"]);

        equal(state.promptTxt, "*");
        equal(state.usePrompt, false);
        equal(state.filename, "filename");
    });

    it("prompt", () => {
        parseArgs(["node", "jed", "-p", "prompt"]);

        equal(state.promptTxt, "prompt");
        equal(state.usePrompt, true);
        equal(state.filename, "");
    });


    it("prompt filename", () => {
        parseArgs(["node", "jed", "-p", "prompt", "filename"]);

        equal(state.promptTxt, "prompt");
        equal(state.usePrompt, true);
        equal(state.filename, "filename");
    });

    it("filename prompt", () => {
        parseArgs(["node", "jed", "filename", "-p", "prompt"]);

        equal(state.promptTxt, "prompt");
        equal(state.usePrompt, true);
        equal(state.filename, "filename");
    });

    it("too many args", () => {
        parseArgs(["node", "jed", "filename", "-p", "prompt", "foo"]);

        equal(state.promptTxt, "*");
        equal(state.usePrompt, false);
        equal(state.filename, "");
    });
});

