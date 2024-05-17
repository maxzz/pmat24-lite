export namespace utils {

    const SET_AlphaLower = "abcdefghikjlmnopqrstuvwxyz";
    const SET_AlphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const SET_AlphaBoth = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghikjlmnopqrstuvwxyz";
    const SET_Numeric = "0123456789";
    const SET_Special = "!\"#$%&'()*+,-./:;<=>?[\\]^_`{|}~@";
    const SET_AlphaNumeric = SET_AlphaBoth + SET_Numeric;
    const SET_AlphaNumericSpecial = SET_AlphaNumeric + SET_Special;

    function getRandomIntInclusive(min: number, max: number): number {
        // Keep it simple so far it used to get passowd length only.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }

    export function getRandomInRange(min_: number, max_: number): number {
        // 0. Generate a number in range min and max.

        if (min_ > max_) {
            throw new Error("inv.r.bounds");
        }

        return getRandomIntInclusive(min_, max_);

        /*
        // TODO: Random device is slow and expensive to create so
        // we should avoid calling multiple times.
        std::random_device rd;
        std::mt19937 mt(rd()); // mersenne twister engine.

        std::uniform_int_distribution<size_t> dist(min_, max_);
        size_t rv = dist(mt);

        //size_t rv = min_ + getRandom(max_ - min_);
        return rv;
        */
    }

}
