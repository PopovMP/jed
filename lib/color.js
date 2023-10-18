"use strict";

/**
 * Terminal colors
 *
 * @type {{
 *  Red: string, Cyan: string, White: string, Yellow: string, Blue: string,
 *  Magenta: string, Black: string, Reset: string, Bright: string, Green: string
 * }}
 */
const color = {
    Reset  : `\x1b[0m`,
    Bright : `\x1b[1m`,
    Black  : `\x1b[30m`,
    Red    : `\x1b[31m`,
    Green  : `\x1b[32m`,
    Yellow : `\x1b[33m`,
    Blue   : `\x1b[34m`,
    Magenta: `\x1b[35m`,
    Cyan   : `\x1b[36m`,
    White  : `\x1b[37m`,
};

/**
 * Returns a bright text
 *
 * @param {string|number} val
 *
 * @return {string}
 */
function bright(val) {
    return `${color.Bright}${val}${color.Reset}`;
}

function brightRed(msg) {
    return `${color.Red}${color.Bright}${msg}${color.Reset}`;
}

module.exports = {
    color,
    bright,
    brightRed,
};
