"use strict";

const {equal}        = require("assert");
const {describe, it} = require("node:test");

const {parseArgs} = require("../lib/arg.js");

describe("parseArgs", () => {

    it("no args", () => {
        const dto = parseArgs(["node", "jed"]);

        equal(dto.prompt,   "");
        equal(dto.filename, "");
    });

    it("filename", () => {
        const dto = parseArgs(["node", "jed", "filename"]);

        equal(dto.prompt,   "");
        equal(dto.filename, "filename");
    });

    it("prompt", () => {
        const dto = parseArgs(["node", "jed", "-p", "prompt"]);

        equal(dto.prompt,   "prompt");
        equal(dto.filename, "");
    });


    it("prompt filename", () => {
        const dto = parseArgs(["node", "jed", "-p", "prompt", "filename"]);

        equal(dto.prompt,   "prompt");
        equal(dto.filename, "filename");
    });

    it("filename prompt", () => {
        const dto = parseArgs(["node", "jed", "filename", "-p", "prompt"]);

        equal(dto.prompt,   "prompt");
        equal(dto.filename, "filename");
    });

    it("too many args", () => {
        const dto = parseArgs(["node", "jed", "filename", "-p", "prompt", "foo"]);

        equal(dto.prompt,   "");
        equal(dto.filename, "");
    });
});

