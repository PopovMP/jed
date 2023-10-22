"use strict";

const fs = require("node:fs");
const {brightRed} = require("./color");

/**
 * Reads a file from the disk
 *
 * @param {string} filename
 * @param {(lines: string[]) => void} callback
 * @returns {void}
 */
function readFile(filename, callback) {
    fs.readFile(filename, {encoding: "utf8"}, fs_readFile_ready);

    function fs_readFile_ready(err, content) {
        if (err) {
            console.error(brightRed(err));
            callback([]);
            return;
        }

        const lines = content.trimEnd().split(/\r?\n/);
        callback(lines);
    }
}

/**
 * Writes a file
 *
 * @param {string} filename
 * @param {string} content
 * @param {() => void} callback
 * @returns {void}
 */
function writeFile(filename, content, callback) {
    fs.writeFile(filename, content, {encoding: "utf8"}, fs_writeFile_ready);

    function fs_writeFile_ready(err) {
        if (err) {
            console.error(brightRed(err));
            callback();
            return;
        }

        console.log("File saved");
        callback();
    }
}

module.exports = {
    readFile,
    writeFile,
}
