"use strict";

/**
 * @typedef {Object} InputDto
 *
 * @property {number[]} range
 * @property {string} command
 * @property {string} parameter
 */

/**
 * Parses the input
 * @param {string} input
 * @param {number} currLine
 * @param {number} lineCnt
 * @returns {InputDto}
 */
function parseInput(input, currLine, lineCnt) {
    /** @type {InputDto} */
    const dto = {
        range    : [currLine, currLine],
        command  : "",
        parameter: "",
    }

    if (["a", "d", "q", "w"].includes(input)) {
        dto.command = input;
        return dto;
    }

    // Parse a single number
    if (input.match(/^[0-9]+$/)) {
        const num = parseInt(input);
        dto.range = [num, num];
        dto.command = "change-current-line";
        return dto;
    }

    // Parse a range of two numbers
    // 5,6
    const rangeCommandRegEx = /^(\d+),(\d+)([a-zA-Z])+/;
    const rangeCommandMatch = rangeCommandRegEx.exec(input);
    if (rangeCommandMatch) {
        const from = parseInt(rangeCommandMatch[1])-1;
        const to   = parseInt(rangeCommandMatch[2])-1;

        dto.range   = [from, to];
        dto.command = rangeCommandMatch[3];
        return dto;
    }

    return dto;
}

module.exports = {
    parseInput,
}
