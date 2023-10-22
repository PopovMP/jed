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

    if (["a", "q", "w"].includes(input)) {
        dto.command = input;
    }

    return dto;
}

module.exports = {
    parseInput,
}
