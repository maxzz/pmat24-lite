//https://rosettacode.org/wiki/Find_common_directory_path#JavaScript 'Find common directory path'

const reSplit = /(?:\\|\/)/; // '/'

/**
 * Given an array of strings, return an array of arrays, containing the
 * strings split at the given separator
 * @param {!Array<!string>} arr
 * @param {string} sep
 * @returns {!Array<!Array<string>>}
 */
const splitStrings = (arr: string[], sep: string | RegExp = reSplit): string[][] => arr.map(i => i.split(sep));

/**
 * Given an index number, return a function that takes an array and returns the
 * element at the given index
 * @param {number} idx
 * @return {function(!Array<*>): *}
 */
const elAt = (idx) => a => a[idx];

/**
 * Transpose an array of arrays:
 * Example:
 * [['a', 'b', 'c'], ['A', 'B', 'C'], [1, 2, 3]] ->
 * [['a', 'A', 1], ['b', 'B', 2], ['c', 'C', 3]]
 * @param {!Array<!Array<*>>} arr
 * @return {!Array<!Array<*>>}
 */
const rotate = (arr: any[][]): any[][] => arr[0].map((e, idx) => arr.map(elAt(idx)));

/**
 * Checks of all the elements in the array are the same.
 * @param {!Array<*>} arr
 * @return {boolean}
 */
const allElementsEqual = (arr) => arr.every(e => e === arr[0]);

export function commonPath(input: string[], sep: string | RegExp = reSplit): string {
    return rotate(splitStrings(input, sep))
        .filter(allElementsEqual)
        .map(elAt(0))
        .join('/');
}

const cdpInput1 = [
    '/home/user1/tmp/coverage/test',
    '/home/user1/tmp/covert/operator',
    '/home/user1/tmp/coven/members',
    '/home/user1\\tmp\\coven/members',
];

const cdpInput2 = [
    '/home/user1/tmp/coverage/test',
    '/home/user1/tmp/covert/operator',
    'C:/man-in-middle/home/user1/tmp/coven/members',
    'C:/man-in-middle/home/user1\\tmp\\coven/members',
];

const cdpInput3 = [
    '/home/user1/tmp/coverage/test',
    '/home/user1/tmp/covert/operator',
    'C:/home/user1/tmp/coven/members',
    'C:/home/user1\\tmp\\coven/members',
];

const cdpInput4 = [
    '/home/user1/tmp/coverage/test',
    '/home/user1/tmp/covert/operator',
    'C:/C:home/user1/tmp/coven/members',
    'C:/C:home/user1\\tmp\\coven/members',
];

export function testCommonPath() {
    console.log(`Common path 1 is: ${commonPath(cdpInput1)}`); // Common path 1 is: /home/user1/tmp
    console.log(`Common path 2 is: ${commonPath(cdpInput2)}`); // Common path 2 is: 
    console.log(`Common path 3 is: ${commonPath(cdpInput3)}`); // Common path 3 is: home/user1/tmp
    console.log(`Common path 4 is: ${commonPath(cdpInput4)}`); // Common path 4 is: user1/tmp
}



