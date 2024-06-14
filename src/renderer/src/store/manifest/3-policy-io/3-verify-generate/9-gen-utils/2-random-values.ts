/**
 * Keep it simple so far it used to get passowd length only.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function jsRandomIntInclusive(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

/**
 * https://stackoverflow.com/questions/18230217/javascript-generate-a-random-number-within-a-range-using-crypto-getrandomvalues
 */
function cryptoRandomLengthInclusive1(min: number, max: number): number {
    // Create byte array and fill with 1 random number
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range) {
        return cryptoRandomLengthInclusive1(min, max);
    }
    return min + (byteArray[0] % range);
}

/**
 * https://github.com/EFForg/OpenWireless/blob/master/app/js/diceware.js
 */
function cryptoRandomLengthInclusive2(min: number, max: number): number {
    let range = max - min + 1;

    let bitsNeeded = Math.ceil(Math.log2(range));
    if (bitsNeeded > 53) {
        throw new Error("We cannot generate numbers larger than 53 bits.");
    }
    let bytesNeeded = Math.ceil(bitsNeeded / 8);
    let mask = Math.pow(2, bitsNeeded) - 1; // 7776 -> (2^13 = 8192) -1 == 8191 or 0x00001111 11111111

    let byteArray = new Uint8Array(bytesNeeded); // Create byte array and fill with N random numbers
    crypto.getRandomValues(byteArray);

    let rv = 0;
    let pow = (bytesNeeded - 1) * 8;
    for (let idx = 0; idx < bytesNeeded; idx++) {
        rv += byteArray[idx] * Math.pow(2, pow);
        pow -= 8;
    }

    rv = rv & mask; // Use & to apply the mask and reduce the number of recursive lookups

    if (rv >= range) {
        return cryptoRandomLengthInclusive2(min, max); // Integer out of acceptable range
    }

    return min + rv; // Return an integer that falls within the range
}

export function getRandomInRange(min: number, max: number): number {
    if (min > max) {
        throw new Error("inv.r.bounds");
    }

    return jsRandomIntInclusive(min, max);
    // return cryptoRandomLengthInclusive1(min, max);
    // return cryptoRandomLengthInclusive2(min, max);
}
/* c++
    //TODO: Random device is slow and expensive to create so we should avoid calling multiple times.
    std::random_device rd;
    std::mt19937 mt(rd()); // mersenne twister engine.

    std::uniform_int_distribution<size_t> dist(min_, max_);
    size_t rv = dist(mt);

    //size_t rv = min_ + getRandom(max_ - min_);
    return rv;
*/

export function getRandomCryptoValues(length: number): number[] {
    const buf = new Uint8Array(length);
    crypto.getRandomValues(buf);
    return Array.from(buf);
}
