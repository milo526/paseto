"use strict";
exports.__esModule = true;
exports.ms = void 0;
var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
var ms = function (str) {
    var matched = REGEX.exec(str);
    if (!matched) {
        throw new TypeError("invalid time period format (\"" + str + "\")");
    }
    var value = parseFloat(matched[1]);
    // unit typed as all possible values of the second capture group in the array
    // to prevent ts from detecting dead code paths.
    var unit = matched[2].toLowerCase();
    switch (unit) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            return Math.round(value * second);
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            return Math.round(value * minute);
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            return Math.round(value * hour);
        case 'day':
        case 'days':
        case 'd':
            return Math.round(value * day);
        case 'week':
        case 'weeks':
        case 'w':
            return Math.round(value * week);
        case 'year':
        case 'years':
        case 'yr':
        case 'yrs':
        case 'y':
            return Math.round(value * year);
    }
};
exports.ms = ms;
